import { useState, type FormEvent } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { DEVELOPER_PROFILE } from '@/data/profile';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API unavailable
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(
      subject.trim() || `Portfolio Inquiry from ${name.trim() || 'Visitor'}`
    );
    const mailBody = encodeURIComponent(
      `Hi Yasas,\n\n${message.trim()}\n\nBest regards,\n${name.trim() || 'Visitor'}`
    );
    window.location.href = `mailto:${DEVELOPER_PROFILE.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section
      id="contact"
      className="border-t border-slate-200/70 bg-slate-50/70 py-20 dark:border-slate-800/70 dark:bg-[#090E1B] sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="06"
          eyebrow="Get In Touch"
          title="Let's Build Something Extraordinary"
          description="Open to software engineering roles, cloud architecture consulting, Hospitality SaaS collaborations, and startup partnerships."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Direct Channels */}
          <div className="space-y-4 lg:col-span-5">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800/90 dark:bg-[#0D1426]">
              <div className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Direct Email
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <a
                  href={`mailto:${DEVELOPER_PROFILE.email}`}
                  className="truncate font-mono text-sm font-semibold text-slate-900 hover:text-violet-600 dark:text-white dark:hover:text-violet-300"
                >
                  {DEVELOPER_PROFILE.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 font-mono text-xs font-medium text-slate-700 transition hover:border-violet-400 dark:border-slate-700 dark:text-slate-200"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  label: 'GitHub',
                  value: '@YWanigaarachchi',
                  href: 'https://github.com/YWanigaarachchi',
                  icon: Github,
                },
                {
                  label: 'LinkedIn',
                  value: 'yasas-wanigaarachchi',
                  href: 'https://linkedin.com/in/yasas-wanigaarachchi',
                  icon: Linkedin,
                },
                {
                  label: 'SoftgenixLK',
                  value: 'softgenix.lk',
                  href: 'https://softgenix.lk',
                  icon: Globe,
                },
                {
                  label: 'Dev.to Articles',
                  value: '@ywanigaarachchi',
                  href: 'https://dev.to/ywanigaarachchi',
                  icon: Mail,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-slate-200/90 bg-white px-4 py-3.5 transition hover:border-violet-400/70 dark:border-slate-800/90 dark:bg-[#0D1426] dark:hover:border-violet-500/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-300">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.label}
                      </div>
                      <div className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100">
                        {item.value}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 transition group-hover:text-violet-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Message Composer */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800/90 dark:bg-[#0D1426] sm:p-8 lg:col-span-7"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Send a Quick Message
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Composes an email directly to{' '}
              <span className="font-mono text-violet-600 dark:text-violet-300">
                {DEVELOPER_PROFILE.email}
              </span>
              .
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block font-mono text-xs text-slate-600 dark:text-slate-300"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Perera"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:text-white dark:focus:border-violet-400"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block font-mono text-xs text-slate-600 dark:text-slate-300"
                >
                  Topic / Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Software Architecture / SaaS Inquiry"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:text-white dark:focus:border-violet-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact-message"
                className="mb-1.5 block font-mono text-xs text-slate-600 dark:text-slate-300"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your project, team, or engineering opportunity..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900/70 dark:text-white dark:focus:border-violet-400"
              />
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
            >
              <Send className="h-4 w-4" />
              <span>Compose Email</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
