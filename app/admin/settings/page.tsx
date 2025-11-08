'use client';

import { useEffect, useState } from 'react';
import { Save, Plus, X } from 'lucide-react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    siteTitle: '',
    siteDescription: '',
    heroText: '',
    heroButton1Text: '',
    heroButton2Text: '',
    aboutText: '',
    aboutText2: '',
    aboutTechStack: [] as string[],
    aboutIcon: '',
    contactHeading: '',
    contactDescription: '',
    resumeUrl: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      email: '',
      portfolio: '',
    },
  });
  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setFormData({
        siteTitle: data.siteTitle || '',
        siteDescription: data.siteDescription || '',
        heroText: data.heroText || '',
        heroButton1Text: data.heroButton1Text || '',
        heroButton2Text: data.heroButton2Text || '',
        aboutText: data.aboutText || '',
        aboutText2: data.aboutText2 || '',
        aboutTechStack: data.aboutTechStack || [],
        aboutIcon: data.aboutIcon || '',
        contactHeading: data.contactHeading || '',
        contactDescription: data.contactDescription || '',
        resumeUrl: data.resumeUrl || '',
        socialLinks: data.socialLinks || {
          github: '',
          linkedin: '',
          twitter: '',
          email: '',
          portfolio: '',
        },
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Settings saved successfully!');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

      <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-6 max-w-3xl">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Site Title</label>
          <input
            type="text"
            value={formData.siteTitle}
            onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Site Description</label>
          <input
            type="text"
            value={formData.siteDescription}
            onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Hero Text</label>
          <input
            type="text"
            value={formData.heroText}
            onChange={(e) => setFormData({ ...formData, heroText: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Hero Button 1 Text</label>
          <input
            type="text"
            value={formData.heroButton1Text}
            onChange={(e) => setFormData({ ...formData, heroButton1Text: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Learn More"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Hero Button 2 Text</label>
          <input
            type="text"
            value={formData.heroButton2Text}
            onChange={(e) => setFormData({ ...formData, heroButton2Text: e.target.value })}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="View Projects"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">About Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">About Text (First Paragraph)</label>
              <textarea
                value={formData.aboutText}
                onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">About Text (Second Paragraph)</label>
              <textarea
                value={formData.aboutText2}
                onChange={(e) => setFormData({ ...formData, aboutText2: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">About Icon (Emoji)</label>
              <input
                type="text"
                value={formData.aboutIcon}
                onChange={(e) => setFormData({ ...formData, aboutIcon: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="👨‍💻"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tech Stack</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechStack();
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Add technology (e.g., React, Next.js)"
                />
                <button
                  type="button"
                  onClick={addTechStack}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {formData.aboutTechStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.aboutTechStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechStack(tech)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Section</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Contact Heading</label>
              <input
                type="text"
                value={formData.contactHeading}
                onChange={(e) => setFormData({ ...formData, contactHeading: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Let's Connect"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Contact Description</label>
              <textarea
                value={formData.contactDescription}
                onChange={(e) => setFormData({ ...formData, contactDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                placeholder="I'm always open to discussing new projects..."
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resume</h3>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Resume URL (Google Drive)</label>
            <input
              type="url"
              value={formData.resumeUrl}
              onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://drive.google.com/file/d/..."
            />
            <p className="mt-2 text-sm text-slate-400">
              Enter your Google Drive resume URL. Make sure the file is set to "Anyone with the link can view" for the download to work.
            </p>
            {formData.resumeUrl && formData.resumeUrl.includes('drive.google.com') && (
              <p className="mt-2 text-sm text-yellow-400">
                ⚠️ For Google Drive: Make sure your file is set to "Anyone with the link can view" for the download to work.
              </p>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">GitHub</label>
              <input
                type="url"
                value={formData.socialLinks.github}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, github: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn</label>
              <input
                type="url"
                value={formData.socialLinks.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Twitter</label>
              <input
                type="url"
                value={formData.socialLinks.twitter}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.socialLinks.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, email: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Portfolio</label>
              <input
                type="url"
                value={formData.socialLinks.portfolio}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: { ...formData.socialLinks, portfolio: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}

