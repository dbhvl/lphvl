import type { Metadata } from 'next';
import { FaqPage } from '@/components/FaqPage';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Jawaban seputar Token, aktivasi, watermark, dan masa berlaku album Hai Velyu Studio.',
};

export default function Faq() {
  return <FaqPage />;
}
