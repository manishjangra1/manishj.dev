'use client';

import { useEffect, useState } from 'react';
import { Save, Plus, X, Upload, Trash2, FileText, Image as ImageIcon, Eye, EyeOff, Check, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

type SettingsTab = 'hero' | 'about' | 'capabilities' | 'contact' | 'resume';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('hero');
  const [formData, setFormData] = useState({
    siteTitle: '',
    siteDescription: '',
    heroKicker: '',
    heroName: '',
    heroText: '',
    heroAvailability: '',
    heroButton1Text: '',
    heroButton2Text: '',
    githubUsername: '',
    avatarUrl: '',
    aboutTitle: '',
    aboutText: '',
    aboutText2: '',
    aboutTechStack: [] as string[],
    aboutIcon: '',
    aboutImage: '',
    showAboutImage: false,
    capabilities: [
      { label: 'Clients', items: [] as string[] },
      { label: 'Servers', items: [] as string[] },
      { label: 'Platform', items: [] as string[] },
    ],
    contactHeading: '',
    contactDescription: '',
    location: '',
    resumeUrl: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      email: '',
      portfolio: '',
      whatsapp: '',
    },
  });

  const [techInput, setTechInput] = useState('');
  const [capItemInputs, setCapItemInputs] = useState(['', '', '']);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data) {
        setFormData({
          siteTitle: data.siteTitle || '',
          siteDescription: data.siteDescription || '',
          heroKicker: data.heroKicker || 'Software engineer',
          heroName: data.heroName || 'Manish Jangra',
          heroText: data.heroText || '',
          heroAvailability: data.heroAvailability || 'Available for full-time roles and selected engagements',
          heroButton1Text: data.heroButton1Text || 'Get in touch',
          heroButton2Text: data.heroButton2Text || 'See selected work',
          githubUsername: data.githubUsername || 'manishjangra1',
          avatarUrl: data.avatarUrl || 'https://github.com/manishjangra1.png',
          aboutTitle: data.aboutTitle || 'Background, systems, and product thinking.',
          aboutText: data.aboutText || '',
          aboutText2: data.aboutText2 || '',
          aboutTechStack: data.aboutTechStack || [],
          aboutIcon: data.aboutIcon || '👨‍💻',
          aboutImage: data.aboutImage || '',
          showAboutImage: data.showAboutImage || false,
          capabilities: data.capabilities && data.capabilities.length >= 3 ? data.capabilities : [
            { label: 'Clients', items: ['React Native', 'Expo', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS'] },
            { label: 'Servers', items: ['NestJS', 'Node.js', 'Express', 'REST APIs', 'GraphQL', 'Microservices'] },
            { label: 'Platform', items: ['PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Socket.io', 'MongoDB'] },
          ],
          contactHeading: data.contactHeading || 'Get in touch.',
          contactDescription: data.contactDescription || '',
          location: data.location || 'Chandigarh, India',
          resumeUrl: data.resumeUrl || '',
          socialLinks: data.socialLinks || {
            github: 'https://github.com/manishjangra1',
            linkedin: 'https://linkedin.com/in/manishjangra1',
            twitter: '',
            email: 'dev.jangramanish@gmail.com',
            portfolio: 'https://manishj.dev',
            whatsapp: '',
          },
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert('Failed to save settings. Please try again.');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const addTechStack = () => {
    if (techInput.trim() && !formData.aboutTechStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        aboutTechStack: [...formData.aboutTechStack, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechStack = (tech: string) => {
    setFormData({
      ...formData,
      aboutTechStack: formData.aboutTechStack.filter((t) => t !== tech),
    });
  };

  const addCapabilityGroup = () => {
    setFormData({
      ...formData,
      capabilities: [
        ...formData.capabilities,
        { label: `GROUP 0${formData.capabilities.length + 1}`, items: [] },
      ],
    });
  };

  const removeCapabilityGroup = (groupIndex: number) => {
    if (formData.capabilities.length <= 1) {
      alert('You must maintain at least one capability section.');
      return;
    }
    const newCaps = formData.capabilities.filter((_, idx) => idx !== groupIndex);
    setFormData({ ...formData, capabilities: newCaps });
  };

  const addCapabilityItem = (groupIndex: number) => {
    const val = (capItemInputs[groupIndex] || '').trim();
    if (!val) return;
    const newCaps = [...formData.capabilities];
    if (!newCaps[groupIndex].items.includes(val)) {
      newCaps[groupIndex].items.push(val);
      setFormData({ ...formData, capabilities: newCaps });
    }
    const newInputs = { ...capItemInputs, [groupIndex]: '' };
    setCapItemInputs(newInputs as any);
  };

  const removeCapabilityItem = (groupIndex: number, itemToRemove: string) => {
    const newCaps = [...formData.capabilities];
    newCaps[groupIndex].items = newCaps[groupIndex].items.filter((item) => item !== itemToRemove);
    setFormData({ ...formData, capabilities: newCaps });
  };

  const handleUploadResume = async () => {
    if (!resumeFile) return;
    setUploadingResume(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', resumeFile);
      const res = await fetch('/api/resume/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData({ ...formData, resumeUrl: data.url });
        setResumeFile(null);
        alert('Resume uploaded successfully! Click Save Changes to apply.');
      } else {
        alert(data.error || 'Failed to upload resume');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    } finally {
      setUploadingResume(false);
    }
  };

  const handleUploadAboutImage = async () => {
    if (!imageFile) return;
    setUploadingImage(true);
    try {
      const uploadData = new FormData();
      uploadData.append('file', imageFile);
      const res = await fetch('/api/about-image/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData({ ...formData, aboutImage: data.url, showAboutImage: true });
        setImageFile(null);
        alert('Image uploaded successfully! Click Save Changes to apply.');
      } else {
        alert(data.error || 'Failed to upload image');
      }
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const tabs: Array<{ id: SettingsTab; label: string; index: string }> = [
    { id: 'hero', label: 'Hero & Identity', index: '01' },
    { id: 'about', label: 'About & Bio', index: '02' },
    { id: 'capabilities', label: 'Capabilities Stack', index: '03' },
    { id: 'contact', label: 'Contact & Socials', index: '04' },
    { id: 'resume', label: 'Resume & Documents', index: '05' },
  ];

  if (loading) {
    return (
      <div className="py-20 flex items-center justify-center font-mono text-sm text-[var(--color-text-muted)]">
        Loading settings...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8">
      {/* Header Banner with Sticky Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            Portfolio Configuration
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Dynamically control all hero copy, personal bio, skills matrix, socials, and resume links.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchSettings}
            className="p-2 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] rounded-none text-xs font-mono"
            title="Reload from database"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            type="submit"
            disabled={saving}
            className={cn(
              'inline-flex items-center gap-2 px-5 py-2 rounded-none text-xs font-semibold uppercase tracking-wider',
              'bg-[var(--color-text)] text-[var(--color-bg)] hover:opacity-90 transition-all duration-150',
              'disabled:opacity-50'
            )}
          >
            {saving ? (
              <span>Saving...</span>
            ) : saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex overflow-x-auto border-b border-[var(--color-border)] gap-2 pb-px scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all border-b-2 -mb-px rounded-none',
                isActive
                  ? 'border-[var(--color-text)] text-[var(--color-text)] bg-[var(--color-surface)]/60 font-bold'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)]/30'
              )}
            >
              <span>{tab.index} //</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Hero & Identity */}
      {activeTab === 'hero' && (
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none flex flex-col gap-6">
          <div className="pb-4 border-b border-[var(--color-border)]">
            <h2 className="text-base font-bold text-[var(--color-text)]">Hero Section & Core Identity</h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Controls the top fold of the portfolio including name, kicker, bio lede, and availability badge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Hero Kicker Badge
              </label>
              <input
                type="text"
                value={formData.heroKicker}
                onChange={(e) => setFormData({ ...formData, heroKicker: e.target.value })}
                placeholder="Software engineer"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Display Full Name
              </label>
              <input
                type="text"
                value={formData.heroName}
                onChange={(e) => setFormData({ ...formData, heroName: e.target.value })}
                placeholder="Manish Jangra"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Hero Bio / Lede Paragraph
            </label>
            <textarea
              rows={3}
              value={formData.heroText}
              onChange={(e) => setFormData({ ...formData, heroText: e.target.value })}
              placeholder="I build full-stack products — mobile clients, APIs, and the admin systems that run them."
              className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none transition-colors resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              Availability Status Text
            </label>
            <input
              type="text"
              value={formData.heroAvailability}
              onChange={(e) => setFormData({ ...formData, heroAvailability: e.target.value })}
              placeholder="Available for full-time roles and selected engagements"
              className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--color-border)]">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                GitHub Username (Powers Activity Matrix & Avatar)
              </label>
              <input
                type="text"
                value={formData.githubUsername}
                onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
                placeholder="manishjangra1"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Custom Avatar URL (Optional)
              </label>
              <input
                type="text"
                value={formData.avatarUrl}
                onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                placeholder="https://github.com/manishjangra1.png"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none transition-colors font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: About & Bio */}
      {activeTab === 'about' && (
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none flex flex-col gap-6">
          <div className="pb-4 border-b border-[var(--color-border)]">
            <h2 className="text-base font-bold text-[var(--color-text)]">About Section & Engineering Philosophy</h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Edit the background story, profile portrait photo, and technical focus tags.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
              About Section Heading
            </label>
            <input
              type="text"
              value={formData.aboutTitle}
              onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
              placeholder="Background, systems, and product thinking."
              className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Bio Paragraph 1 (Lead Introduction)
              </label>
              <textarea
                rows={4}
                value={formData.aboutText}
                onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                placeholder="I am a full-stack software engineer..."
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none transition-colors resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Bio Paragraph 2 (Philosophy & Systems Focus)
              </label>
              <textarea
                rows={4}
                value={formData.aboutText2}
                onChange={(e) => setFormData({ ...formData, aboutText2: e.target.value })}
                placeholder="I prioritize system simplicity, reliable architecture..."
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none transition-colors resize-y"
              />
            </div>
          </div>

          {/* Profile Photo Management */}
          <div className="pt-4 border-t border-[var(--color-border)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                About Portrait Photo
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono">
                <input
                  type="checkbox"
                  checked={formData.showAboutImage}
                  onChange={(e) => setFormData({ ...formData, showAboutImage: e.target.checked })}
                  className="rounded-none"
                />
                <span>Display image on live site</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-24 h-24 border border-[var(--color-border)] bg-[var(--color-surface)] shrink-0 overflow-hidden rounded-none relative">
                <img
                  src={
                    formData.aboutImage && formData.aboutImage.trim() !== ''
                      ? formData.aboutImage
                      : `https://github.com/${formData.githubUsername || 'manishjangra1'}.png`
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2 w-full">
                <input
                  type="text"
                  value={formData.aboutImage}
                  onChange={(e) => setFormData({ ...formData, aboutImage: e.target.value })}
                  placeholder="Custom image URL (leave blank to use GitHub profile photo automatically)"
                  className="w-full px-3.5 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono rounded-none outline-none"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="text-xs font-mono text-[var(--color-text-muted)] file:mr-3 file:py-1 file:px-3 file:rounded-none file:border file:border-[var(--color-border)] file:bg-[var(--color-surface)] file:text-xs file:font-mono"
                  />
                  {imageFile && (
                    <button
                      type="button"
                      onClick={handleUploadAboutImage}
                      disabled={uploadingImage}
                      className="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] text-xs font-mono rounded-none"
                    >
                      {uploadingImage ? 'Uploading...' : 'Upload File'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Capabilities Stack */}
      {activeTab === 'capabilities' && (
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none flex flex-col gap-6">
          <div className="pb-4 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[var(--color-text)]">Capabilities & Technologies Matrix</h2>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Configure your custom capability sections and tools displayed on the homepage.
              </p>
            </div>
            <button
              type="button"
              onClick={addCapabilityGroup}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] border border-[var(--color-border-strong)] rounded-none text-[var(--color-text)] transition-colors self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Section</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formData.capabilities.map((group, gIdx) => (
              <div
                key={gIdx}
                className="bg-[var(--color-surface)]/40 border border-[var(--color-border)] p-5 rounded-none flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--color-border)] gap-2">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                      <span className="font-mono text-[11px] font-bold text-[var(--color-text-muted)] shrink-0">
                        0{gIdx + 1} //
                      </span>
                      <input
                        type="text"
                        value={group.label}
                        onChange={(e) => {
                          const newCaps = [...formData.capabilities];
                          newCaps[gIdx].label = e.target.value;
                          setFormData({ ...formData, capabilities: newCaps });
                        }}
                        className="bg-transparent font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-text)] outline-none border-b border-transparent focus:border-[var(--color-text)] w-full truncate"
                        placeholder="SECTION NAME"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeCapabilityGroup(gIdx)}
                      className="p-1 text-[var(--color-text-muted)] hover:text-red-500 rounded-none transition-colors shrink-0"
                      title="Delete category section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 min-h-[100px]">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono bg-[var(--color-card)] border border-[var(--color-border)] rounded-none"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          onClick={() => removeCapabilityItem(gIdx, item)}
                          className="text-[var(--color-text-muted)] hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-border)]">
                  <input
                    type="text"
                    value={capItemInputs[gIdx] || ''}
                    onChange={(e) => {
                      const newInputs = { ...capItemInputs, [gIdx]: e.target.value };
                      setCapItemInputs(newInputs as any);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCapabilityItem(gIdx);
                      }
                    }}
                    placeholder="Add technology..."
                    className="flex-1 px-2.5 py-1.5 bg-[var(--color-card)] border border-[var(--color-border)] text-xs rounded-none outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => addCapabilityItem(gIdx)}
                    className="p-1.5 bg-[var(--color-surface)] border border-[var(--color-border-strong)] hover:bg-[var(--color-surface-hover)] rounded-none text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Contact & Socials */}
      {activeTab === 'contact' && (
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none flex flex-col gap-6">
          <div className="pb-4 border-b border-[var(--color-border)]">
            <h2 className="text-base font-bold text-[var(--color-text)]">Contact & Social Accounts</h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Configure your direct email, location, and verified external profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={formData.socialLinks.email || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, email: e.target.value },
                  })
                }
                placeholder="dev.jangramanish@gmail.com"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Base Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Chandigarh, India"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.linkedin || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                  })
                }
                placeholder="https://linkedin.com/in/manishjangra1"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                GitHub Profile URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.github || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, github: e.target.value },
                  })
                }
                placeholder="https://github.com/manishjangra1"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                WhatsApp Link / Number
              </label>
              <input
                type="text"
                value={formData.socialLinks.whatsapp || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, whatsapp: e.target.value },
                  })
                }
                placeholder="https://wa.me/919999999999"
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Twitter / X Profile URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.twitter || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                  })
                }
                placeholder="https://twitter.com/..."
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-text)] text-sm rounded-none outline-none font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Resume & Documents */}
      {activeTab === 'resume' && (
        <div className="bg-[var(--color-card)] border border-[var(--color-border)] p-6 sm:p-8 rounded-none flex flex-col gap-6">
          <div className="pb-4 border-b border-[var(--color-border)]">
            <h2 className="text-base font-bold text-[var(--color-text)]">Resume & Document Management</h2>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Upload your latest curriculum vitae (PDF) or link to an external Google Drive / Cloud document.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Active Resume Link
              </label>
              <input
                type="text"
                value={formData.resumeUrl}
                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                placeholder="/storage/resume.pdf or https://drive.google.com/..."
                className="w-full px-3.5 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-none outline-none font-mono"
              />
            </div>

            <div className="p-6 bg-[var(--color-surface)]/40 border border-dashed border-[var(--color-border-strong)] rounded-none flex flex-col items-center justify-center gap-3">
              <FileText className="w-8 h-8 text-[var(--color-text-muted)]" />
              <div className="text-center">
                <p className="text-xs font-medium text-[var(--color-text)]">Upload Updated PDF Resume</p>
                <p className="text-[11px] font-mono text-[var(--color-text-muted)] mt-0.5">Maximum file size: 10MB (PDF format only)</p>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="text-xs font-mono file:mr-3 file:py-1.5 file:px-3.5 file:rounded-none file:border file:border-[var(--color-border-strong)] file:bg-[var(--color-surface)] file:text-xs file:font-mono"
                />
                {resumeFile && (
                  <button
                    type="button"
                    onClick={handleUploadResume}
                    disabled={uploadingResume}
                    className="px-4 py-1.5 bg-[var(--color-text)] text-[var(--color-bg)] text-xs font-mono font-semibold rounded-none hover:opacity-90 transition-all"
                  >
                    {uploadingResume ? 'Uploading...' : 'Confirm Upload'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
