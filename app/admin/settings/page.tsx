'use client';

import { useEffect, useState } from 'react';
import { Save, Plus, X, Upload, Trash2, FileText, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

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
    aboutImage: '',
    showAboutImage: false,
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
  const [uploading, setUploading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);

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
        aboutImage: data.aboutImage || '',
        showAboutImage: data.showAboutImage || false,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setResumeFile(file);
    }
  };

  const handleUploadResume = async () => {
    if (!resumeFile) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', resumeFile);

      // Upload the file
      const uploadRes = await fetch('/api/resume/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!uploadRes.ok) {
        const error = await uploadRes.json();
        alert(error.error || 'Failed to upload resume');
        return;
      }

      const uploadData = await uploadRes.json();
      const newResumeUrl = uploadData.url;

      // Update form state
      const updatedFormData = { ...formData, resumeUrl: newResumeUrl };
      setFormData(updatedFormData);

      // Automatically save the resume URL to the database
      const saveRes = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });

      if (saveRes.ok) {
        setResumeFile(null);
        alert('Resume uploaded and saved successfully!');
      } else {
        // File uploaded but failed to save URL - still show success for upload
        setResumeFile(null);
        alert('Resume uploaded successfully, but failed to save URL. Please click "Save Settings" to save it.');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Error uploading resume');
    } finally {
      setUploading(false);
    }
  };

  const handleAboutImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only image files are allowed (JPEG, PNG, WebP, GIF)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setAboutImageFile(file);
    }
  };

  const handleUploadAboutImage = async () => {
    if (!aboutImageFile) return;

    setUploadingImage(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', aboutImageFile);

      const uploadRes = await fetch('/api/about-image/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!uploadRes.ok) {
        const error = await uploadRes.json();
        alert(error.error || 'Failed to upload image');
        return;
      }

      const uploadData = await uploadRes.json();
      const newImageUrl = uploadData.url;

      const updatedFormData = { ...formData, aboutImage: newImageUrl, showAboutImage: true };
      setFormData(updatedFormData);

      const saveRes = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      });

      if (saveRes.ok) {
        setAboutImageFile(null);
        alert('Image uploaded and saved successfully!');
      } else {
        setAboutImageFile(null);
        alert('Image uploaded successfully, but failed to save. Please click "Save Settings" to save it.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDeleteAboutImage = async () => {
    if (!formData.aboutImage) return;

    const isStoredFile = formData.aboutImage.startsWith('/storage/') || 
                         formData.aboutImage.includes('blob.vercel-storage.com');

    if (isStoredFile) {
      if (!confirm('Are you sure you want to delete the about image? This will also remove it from the server.')) {
        return;
      }

      try {
        const deleteRes = await fetch(`/api/about-image/delete?url=${encodeURIComponent(formData.aboutImage)}`, {
          method: 'DELETE',
        });

        if (!deleteRes.ok) {
          const error = await deleteRes.json();
          alert(error.error || 'Failed to delete image');
          return;
        }

        const updatedFormData = { ...formData, aboutImage: '', showAboutImage: false };
        setFormData(updatedFormData);

        const saveRes = await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData),
        });

        if (saveRes.ok) {
          alert('Image deleted successfully!');
        } else {
          alert('Image file deleted, but failed to update database. Please click "Save Settings" to update.');
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image');
      }
    } else {
      const updatedFormData = { ...formData, aboutImage: '', showAboutImage: false };
      setFormData(updatedFormData);

      try {
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData),
        });
        alert('Image URL cleared successfully!');
      } catch (error) {
        console.error('Error clearing image URL:', error);
        alert('Failed to clear image URL. Please click "Save Settings" to update.');
      }
    }
  };

  const handleDeleteResume = async () => {
    if (!formData.resumeUrl) return;

    // Check if it's a stored file (not external URL)
    const isStoredFile = formData.resumeUrl.startsWith('/storage/') || 
                         formData.resumeUrl.includes('blob.vercel-storage.com');

    if (isStoredFile) {
      if (!confirm('Are you sure you want to delete the resume file? This will also remove it from the server.')) {
        return;
      }

      try {
        // Delete the file from storage
        const deleteRes = await fetch(`/api/resume/delete?url=${encodeURIComponent(formData.resumeUrl)}`, {
          method: 'DELETE',
        });

        if (!deleteRes.ok) {
          const error = await deleteRes.json();
          alert(error.error || 'Failed to delete resume file');
          return;
        }

        // Update form state
        const updatedFormData = { ...formData, resumeUrl: '' };
        setFormData(updatedFormData);

        // Automatically save the empty resume URL to the database
        const saveRes = await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData),
        });

        if (saveRes.ok) {
          alert('Resume deleted successfully!');
        } else {
          // File deleted but failed to save - still show success for deletion
          alert('Resume file deleted, but failed to update database. Please click "Save Settings" to update.');
        }
      } catch (error) {
        console.error('Error deleting resume:', error);
        alert('Error deleting resume');
      }
    } else {
      // For external links, just clear the URL and save
      const updatedFormData = { ...formData, resumeUrl: '' };
      setFormData(updatedFormData);

      try {
        await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFormData),
        });
        alert('Resume URL cleared successfully!');
      } catch (error) {
        console.error('Error clearing resume URL:', error);
        alert('Failed to clear resume URL. Please click "Save Settings" to update.');
      }
    }
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

            {/* About Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                About Section Image
              </label>
              <div className="space-y-3">
                {/* File Upload */}
                <div className="flex gap-2">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={handleAboutImageChange}
                      className="hidden"
                    />
                    <div className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      {aboutImageFile ? aboutImageFile.name : 'Choose Image File'}
                    </div>
                  </label>
                  {aboutImageFile && (
                    <button
                      type="button"
                      onClick={handleUploadAboutImage}
                      disabled={uploadingImage}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {uploadingImage ? 'Uploading...' : 'Upload'}
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-400">
                  Upload an image (JPEG, PNG, WebP, GIF - max 5MB). If image is shown, it will replace the 3D component.
                </p>

                {/* Current Image Display */}
                {formData.aboutImage && (
                  <div className="p-4 bg-slate-700 border border-slate-600 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <ImageIcon className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white text-sm font-medium">Image Uploaded</p>
                          <p className="text-slate-400 text-xs truncate max-w-md">
                            {formData.aboutImage.startsWith('/storage/') || formData.aboutImage.includes('blob.vercel-storage.com')
                              ? 'Stored File'
                              : formData.aboutImage}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleDeleteAboutImage}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Delete Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-600">
                      <img
                        src={formData.aboutImage}
                        alt="About section preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Show/Hide Toggle */}
                {formData.aboutImage && (
                  <div className="flex items-center justify-between p-3 bg-slate-700 border border-slate-600 rounded-lg">
                    <div className="flex items-center gap-2">
                      {formData.showAboutImage ? (
                        <Eye className="w-5 h-5 text-green-400" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-slate-400" />
                      )}
                      <span className="text-sm text-slate-300">
                        {formData.showAboutImage ? 'Image is visible' : 'Image is hidden (3D component shown)'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...formData, showAboutImage: !formData.showAboutImage };
                        setFormData(updated);
                        // Auto-save the toggle
                        fetch('/api/settings', {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(updated),
                        });
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.showAboutImage
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-slate-600 hover:bg-slate-500 text-slate-300'
                      }`}
                    >
                      {formData.showAboutImage ? 'Hide Image' : 'Show Image'}
                    </button>
                  </div>
                )}
              </div>
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
          <div className="space-y-4">
            {/* File Upload Section */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload Resume (PDF)
              </label>
              <div className="flex gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    {resumeFile ? resumeFile.name : 'Choose PDF File'}
                  </div>
                </label>
                {resumeFile && (
                  <button
                    type="button"
                    onClick={handleUploadResume}
                    disabled={uploading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm text-slate-400">
                Upload a PDF file (max 10MB). The file will be stored securely.
              </p>
            </div>

            {/* Current Resume Display */}
            {formData.resumeUrl && (
              <div className="p-4 bg-slate-700 border border-slate-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white text-sm font-medium">Resume Uploaded</p>
                      <p className="text-slate-400 text-xs truncate max-w-md">
                        {formData.resumeUrl.startsWith('/storage/') || formData.resumeUrl.includes('blob.vercel-storage.com')
                          ? 'Stored File'
                          : formData.resumeUrl}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleDeleteResume}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded-lg transition-colors"
                    title="Delete Resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* External URL Option - Only show if no stored file */}
            {(!formData.resumeUrl || (!formData.resumeUrl.startsWith('/storage/') && !formData.resumeUrl.includes('blob.vercel-storage.com'))) && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Or Enter External Resume URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.resumeUrl && !formData.resumeUrl.startsWith('/storage/') && !formData.resumeUrl.includes('blob.vercel-storage.com') ? formData.resumeUrl : ''}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://drive.google.com/file/d/... or any external URL"
                />
                <p className="mt-2 text-sm text-slate-400">
                  You can also use an external URL (e.g., Google Drive). Make sure the file is publicly accessible.
                </p>
              </div>
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

