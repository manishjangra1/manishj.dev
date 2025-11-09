'use client';

import { useEffect, useState } from 'react';
import { Trash2, Mail, Check } from 'lucide-react';
import { IContact } from '@/lib/models/Contact';
import { format } from 'date-fns';

export default function ContactPage() {
  const [messages, setMessages] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true }),
      });
      if (res.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const res = await fetch(`/api/contact/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const filteredMessages =
    filter === 'all'
      ? messages
      : filter === 'read'
      ? messages.filter((m) => m.read)
      : messages.filter((m) => !m.read);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Contact Messages</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              filter === 'unread'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              filter === 'read'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Read
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <div
            key={message._id?.toString()}
            className={`bg-slate-800 rounded-lg p-6 border ${
              message.read ? 'border-slate-700' : 'border-purple-500'
            }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white break-words">{message.name}</h3>
                  {!message.read && (
                    <span className="px-2 py-1 text-xs bg-purple-600 text-white rounded whitespace-nowrap">New</span>
                  )}
                </div>
                <p className="text-slate-400 text-sm break-all">{message.email}</p>
                <p className="text-slate-500 text-xs mt-1">
                  {format(new Date(message.createdAt), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {!message.read && (
                  <button
                    onClick={() => handleMarkAsRead(message._id!.toString())}
                    className="p-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
                    title="Mark as read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(message._id!.toString())}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-slate-300 whitespace-pre-wrap">{message.message}</p>
          </div>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          No messages found.
        </div>
      )}
    </div>
  );
}

