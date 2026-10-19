/**
 * NASCORE STUDIO — Official Brand Web Application
 * 
 * Production-ready, client-side static & GitHub Pages compatible,
 * with real YouTube Data API v3 and GitHub-powered notice publishing.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { VideosPage } from './pages/VideosPage';
import { ShortsPage } from './pages/ShortsPage';
import { NoticesPage } from './pages/NoticesPage';
import { AboutPage } from './pages/AboutPage';
import { VideoModal } from './components/modals/VideoModal';
import { NoticeDetailModal } from './components/modals/NoticeDetailModal';
import { ConfigModal } from './components/modals/ConfigModal';
import { fetchYouTubeData, FetchResult } from './services/youtube';
import { fetchNotices, DEFAULT_NOTICES } from './services/notices';
import { ActiveTab, YouTubeVideo, YouTubeChannelInfo, NoticeItem } from './types';
import { siteConfig } from './config/siteConfig';

export default function App() {
  // Navigation tab state with browser hash synchronization
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // YouTube data state
  const [channel, setChannel] = useState<YouTubeChannelInfo | null>(null);
  const [regularVideos, setRegularVideos] = useState<YouTubeVideo[]>([]);
  const [shorts, setShorts] = useState<YouTubeVideo[]>([]);
  const [isYtLoading, setIsYtLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [ytError, setYtError] = useState<string | undefined>();

  // Notices data state
  const [notices, setNotices] = useState<NoticeItem[]>(DEFAULT_NOTICES);
  const [isNoticesLoading, setIsNoticesLoading] = useState(false);

  // Active modal targets
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Sync tab with URL hash for GitHub Pages bookmarking and refresh preservation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'videos', 'shorts', 'notices', 'about'].includes(hash)) {
        setActiveTab(hash as ActiveTab);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.location.hash = tab === 'home' ? '' : tab;
  };

  // Load YouTube Data
  const loadYouTube = useCallback(async (forceRefresh = false) => {
    setIsYtLoading(true);
    try {
      const res: FetchResult = await fetchYouTubeData(forceRefresh);
      setChannel(res.channel);
      setRegularVideos(res.regularVideos);
      setShorts(res.shorts);
      setIsFallback(res.isFallback);
      setYtError(res.errorMessage);
    } catch (err: any) {
      console.error('[NASCORE STUDIO] Error loading YouTube:', err);
    } finally {
      setIsYtLoading(false);
    }
  }, []);

  // Load Notices
  const loadNotices = useCallback(async () => {
    setIsNoticesLoading(true);
    try {
      const res = await fetchNotices();
      setNotices(res.notices);
    } catch (err) {
      console.warn('[NASCORE STUDIO] Error loading notices:', err);
    } finally {
      setIsNoticesLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadYouTube(false);
    loadNotices();
  }, [loadYouTube, loadNotices]);

  // Live tester handler in ConfigModal
  const handleTestConnection = async (testApiKey: string, testChannelId: string): Promise<boolean> => {
    try {
      // Temporarily override siteConfig in memory
      siteConfig.youtube.apiKey = testApiKey.trim();
      siteConfig.youtube.channelId = testChannelId.trim();
      
      const res = await fetchYouTubeData(true);
      if (!res.isFallback && res.videos.length > 0) {
        setChannel(res.channel);
        setRegularVideos(res.regularVideos);
        setShorts(res.shorts);
        setIsFallback(false);
        setYtError(undefined);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Top Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenConfig={() => setIsConfigOpen(true)}
        isApiConfigured={!isFallback && !!siteConfig.youtube.apiKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {isYtLoading && !channel ? (
          /* High-Fidelity Loading Skeleton */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <div className="h-4 w-32 bg-white/[0.05] rounded" />
                <div className="h-14 w-4/5 bg-white/[0.08] rounded-xl" />
                <div className="h-6 w-3/5 bg-white/[0.05] rounded" />
                <div className="flex gap-4 pt-6">
                  <div className="h-12 w-36 bg-blue-600/30 rounded-xl" />
                  <div className="h-12 w-32 bg-white/[0.05] rounded-xl" />
                </div>
              </div>
              <div className="lg:col-span-5 h-80 bg-white/[0.05] rounded-2xl" />
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <HomePage
                channel={channel || {
                  id: siteConfig.youtube.channelId,
                  title: siteConfig.brand.name,
                  description: siteConfig.brand.description,
                  publishedAt: '',
                  thumbnails: {},
                }}
                regularVideos={regularVideos}
                shorts={shorts}
                notices={notices}
                onPlayVideo={(video) => setActiveVideo(video)}
                onReadNotice={(notice) => setActiveNotice(notice)}
                onNavigateTab={handleSelectTab}
                onOpenConfig={() => setIsConfigOpen(true)}
                isFallback={isFallback}
              />
            )}

            {activeTab === 'videos' && (
              <VideosPage
                videos={regularVideos}
                onPlayVideo={(video) => setActiveVideo(video)}
                isLoading={isYtLoading}
                onRefresh={() => loadYouTube(true)}
              />
            )}

            {activeTab === 'shorts' && (
              <ShortsPage
                shorts={shorts}
                onPlayShort={(short) => setActiveVideo(short)}
              />
            )}

            {activeTab === 'notices' && (
              <NoticesPage
                notices={notices}
                onReadNotice={(notice) => setActiveNotice(notice)}
                onRefresh={loadNotices}
                isLoading={isNoticesLoading}
              />
            )}

            {activeTab === 'about' && <AboutPage />}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      {/* Modals */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      <NoticeDetailModal
        notice={activeNotice}
        onClose={() => setActiveNotice(null)}
      />

      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onTestConnection={handleTestConnection}
        currentChannelId={channel?.id || siteConfig.youtube.channelId}
        hasApiKey={!isFallback && !!siteConfig.youtube.apiKey}
      />
    </div>
  );
}
