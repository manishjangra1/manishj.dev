'use client';

import { useEffect, useState } from 'react';
import { Trash2, Mail, Check, MessageSquare, Clock } from 'lucide-react';
import { IContact } from '@/lib/models/Contact';
import { cn } from '@/lib/utils';

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
      setMessages(Array.isArray(data) ? data : []);
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
      } else {
        alert('Failed to delete message.');
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
    return (
      <div className="py-20 flex items-center justify-center font-mono text-sm text-[var(--color-text-muted)]">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
            Contact Messages
          </h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Review incoming inquiries and collaboration requests submitted through the portfolio.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 rounded-none">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-3 py-1.5 text-xs font-mono rounded-none transition-colors',
              filter === 'all'
                ? 'bg-[var(--color-card)] text-[var(--color-text)] font-semibold shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            )}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={cn(
              'px-3 py-1.5 text-xs font-mono rounded-none transition-colors',
              filter === 'unread'
                ? 'bg-[var(--color-card)] text-[var(--color-text)] font-semibold shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            )}
          >
            Unread ({messages.filter((m) => !m.read).length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={cn(
              'px-3 py-1.5 text-xs font-mono rounded-none transition-colors',
              filter === 'read'
                ? 'bg-[var(--color-card)] text-[var(--color-text)] font-semibold shadow-xs'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            )}
          >
            Read ({messages.filter((m) => m.read).length})
          </button>
        </div>
      </div>

      {/* Messages List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMessages.map((message) => {
          const id = message._id?.toString();
          return (
            <div
              key={id}
              className={cn(
                'bg-[var(--color-card)] border p-6 rounded-none transition-all duration-150 flex flex-col gap-4',
                !message.read
                  ? 'border-[var(--color-border-strong)] shadow-xs'
                  : 'border-[var(--color-border)] opacity-85 hover:opacity-100'
              )}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-base font-bold text-[var(--color-text)]">
                    {message.name}
                  </h3>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-xs font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] underline decoration-dotted"
                  >
                    {message.email}
                  </a>
                  {!message.read && (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 rounded-none">
                      New
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[var(--color-text-muted)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(message.createdAt).toLocaleString()}</span>
                  </span>
                  <div className="flex items-center gap-1 ml-2">
                    {!message.read && (
                      <button
                        onClick={() => handleMarkAsRead(id!)}
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface)] rounded-none"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(id!)}
                      className="p-1.5 text-red-500/80 hover:text-red-500 border border-red-500/30 hover:bg-red-500/10 rounded-none transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap leading-relaxed">
                {message.message}
              </p>
            </div>
          );
        })}
      </div>

      {filteredMessages.length === 0 && (
        <div className="p-12 text-center bg-[var(--color-card)] border border-dashed border-[var(--color-border)] rounded-none">
          <MessageSquare className="w-8 h-8 mx-auto text-[var(--color-text-muted)] mb-3" />
          <h3 className="font-bold text-sm text-[var(--color-text)]">No messages in inbox</h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            New contact submissions will show up here in real time.
          </p>
        </div>
      )}
    </div>
  );
}
