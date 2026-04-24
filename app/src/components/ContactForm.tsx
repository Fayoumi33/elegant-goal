import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const API_URL = 'http://localhost:8080/send-email';

export default function ContactForm({ open, onOpenChange }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setSubmitting(false);
      setError('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name')?.toString().trim(),
      number: formData.get('phone')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      message: formData.get('message')?.toString().trim(),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
        e.currentTarget.reset();
        setTimeout(() => {
          setSubmitted(false);
          onOpenChange(false);
        }, 2500);
      } else {
        const text = await response.text();
        setError(text || 'حدث خطأ أثناء الإرسال.');
      }
    } catch (err) {
      setError('تعذر الاتصال بالخادم. تأكد من تشغيل سيرفر Go على المنفذ 8080.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="sm:max-w-md">
        {submitted ? (
          <div className="py-10 text-center">
            <div className="text-goldenrod mb-2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <p className="font-cairo font-bold text-lg text-charcoal">
              تم الإرسال بنجاح!
            </p>
            <p className="font-geist text-sm text-[#666666] mt-1">
              سنتواصل معك قريباً.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-right">
                <p className="font-geist text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="name" className="font-geist text-sm text-right block">
                الاسم
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="أدخل اسمك الكامل"
                required
                className="font-geist text-right"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="font-geist text-sm text-right block">
                رقم الجوال
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+966 56 711 4014 مثال"
                required
                className="font-geist text-right"
                dir="ltr"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email" className="font-geist text-sm text-right block">
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                required
                className="font-geist text-left"
                dir="ltr"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="font-geist text-sm text-right block">
                تفاصيل المشروع
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="اكتب وصفاً مختصراً لمشروعك أو استفسارك..."
                required
                rows={4}
                className="font-geist text-right resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-goldenrod hover:bg-[#c8941d] text-[#1a1a1a] font-geist font-bold rounded-full h-11 transition-all duration-300 disabled:opacity-60"
            >
              {submitting ? 'جاري الإرسال...' : 'إرسال'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
