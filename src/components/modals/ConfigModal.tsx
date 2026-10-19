import React, { useState } from 'react';
import { X, Youtube, Key, Check, Copy, ExternalLink, RefreshCw, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTestConnection: (apiKey: string, channelId: string) => Promise<boolean>;
  currentChannelId: string;
  hasApiKey: boolean;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({
  isOpen,
  onClose,
  onTestConnection,
  currentChannelId,
  hasApiKey,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [channelIdInput, setChannelIdInput] = useState(currentChannelId);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [activeTab, setActiveTab] = useState<'youtube' | 'notices'>('youtube');

  if (!isOpen) return null;

  const handleTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    const success = await onTestConnection(apiKeyInput, channelIdInput);
    if (success) {
      setTestResult({
        success: true,
        message: 'Connected successfully to YouTube Data API! Live uploads fetched.',
      });
    } else {
      setTestResult({
        success: false,
        message:
          'Could not connect. Please verify your YouTube API key is active and your Channel ID is correct (must start with UC... or be a valid handle).',
      });
    }
    setTesting(false);
  };

  const envSnippet = `# NASCORE STUDIO — Environment Configuration
VITE_YOUTUBE_API_KEY="${apiKeyInput || 'YOUR_YOUTUBE_DATA_API_V3_KEY'}"
VITE_YOUTUBE_CHANNEL_ID="${channelIdInput || 'UCxxxxxxxxxxxxxxxxxxxxxx'}"
VITE_GITHUB_REPO_OWNER="${siteConfig.github.owner}"
VITE_GITHUB_REPO_NAME="${siteConfig.github.repo}"
`;

  const handleCopyEnv = () => {
    navigator.clipboard.writeText(envSnippet);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#090b14] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl shadow-black flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0c0e1a]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <h2 className="text-base font-bold text-white font-display">
              Studio Configuration & Channel Setup
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-white/[0.08] px-6 bg-[#080a12]">
          <button
            onClick={() => setActiveTab('youtube')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
              activeTab === 'youtube'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            YouTube API & Channel
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
              activeTab === 'notices'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            GitHub Notice Publishing
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'youtube' ? (
            <>
              {/* Status Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  hasApiKey
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                }`}
              >
                {hasApiKey ? (
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="text-xs leading-relaxed">
                  <div className="font-semibold text-sm mb-0.5">
                    {hasApiKey ? 'YouTube API Connected' : 'Preview Mode Active'}
                  </div>
                  {hasApiKey
                    ? 'Your YouTube Data API key is configured. Videos and channel metadata are being fetched live with quota-safe caching.'
                    : 'Currently showing curated sample videos. Follow the steps below to connect your real YouTube channel in under 2 minutes.'}
                </div>
              </div>

              {/* Quick Live Tester Form */}
              <form onSubmit={handleTest} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    YouTube Channel ID or Handle
                  </label>
                  <input
                    type="text"
                    value={channelIdInput}
                    onChange={(e) => setChannelIdInput(e.target.value)}
                    placeholder="e.g. UCxxxxxxxxxxxxxxxxxxxxxx or @nascorestudio"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1220] border border-white/[0.1] text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    Find your Channel ID at: <a href="https://www.youtube.com/account_advanced" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">youtube.com/account_advanced</a>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    YouTube Data API v3 Key (Free)
                  </label>
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="Enter your browser-restricted YouTube API Key"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0e1220] border border-white/[0.1] text-white text-sm focus:border-blue-500 focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-slate-400">
                    Create a free key in <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Cloud Console</a> &gt; Enable "YouTube Data API v3".
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={testing}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-xs font-semibold uppercase tracking-wider text-white transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {testing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Testing Connection...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Test & Load Channel Live</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {testResult && (
                <div
                  className={`p-3.5 rounded-lg text-xs leading-relaxed border ${
                    testResult.success
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/30 border-red-500/40 text-red-300'
                  }`}
                >
                  {testResult.message}
                </div>
              )}

              {/* Permanent Setup Instructions */}
              <div className="border-t border-white/[0.08] pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Permanent Environment Setup (.env)
                  </h4>
                  <button
                    onClick={handleCopyEnv}
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    {copiedEnv ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEnv ? 'Copied' : 'Copy .env snippet'}</span>
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-[#05060b] border border-white/[0.08] text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                  {envSnippet}
                </pre>
                <p className="text-xs text-slate-400">
                  Or edit <code className="text-blue-400 font-mono">src/config/siteConfig.ts</code> directly to set your channel ID and settings for static export.
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-blue-200 text-xs leading-relaxed">
                <div className="font-semibold text-sm mb-1 text-white">
                  Zero-Server GitHub Notice Publishing Workflow
                </div>
                You can publish, update, and pin notices directly on GitHub without running a terminal or spending a penny on a CMS!
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="font-semibold text-slate-100 uppercase tracking-wider text-[11px]">
                  Step-by-Step GitHub Guide:
                </div>
                <ol className="list-decimal ml-5 space-y-2">
                  <li>
                    Open your repository on GitHub: <a href={siteConfig.deployment.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{siteConfig.deployment.repoUrl}</a>
                  </li>
                  <li>
                    Navigate to the folder: <code className="text-blue-400 font-mono">public/content/notices/index.json</code>
                  </li>
                  <li>
                    Click the <strong>Edit (Pencil icon)</strong> on GitHub.
                  </li>
                  <li>
                    Add your new notice entry to the <code className="text-blue-400 font-mono">notices</code> array (or copy the template below).
                  </li>
                  <li>
                    Click <strong>Commit changes</strong>.
                  </li>
                  <li>
                    The website fetches this file directly from GitHub Raw or via your GitHub Pages static build, so the new notice goes live automatically!
                  </li>
                </ol>
              </div>

              {/* Sample Notice Template */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-200 mb-2">
                  Notice JSON Template (Copy & Paste):
                </div>
                <pre className="p-3 rounded-lg bg-[#05060b] border border-white/[0.08] text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`{
  "id": "notice-2025-04",
  "slug": "new-video-premiere-announcement",
  "title": "Documentary Premiere: The Dark Side of Internet Archives",
  "date": "${new Date().toISOString().split('T')[0]}",
  "category": "Release",
  "summary": "Join us this Friday at 6 PM EST for the live premiere of our new investigative film.",
  "pinned": true,
  "author": {
    "name": "NASCORE STUDIO",
    "role": "Editorial"
  },
  "content": "Full markdown content goes here! Support for **bold**, *italic*, bullet points, and [links](https://youtube.com)."
}`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
