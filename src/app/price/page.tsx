import type { Metadata } from 'next';
import { HargaPage } from '@/components/HargaPage';

export const metadata: Metadata = {
  title: 'Harga',
  description:
    'Tanpa biaya bulanan. Fotografer menerbitkan album dengan Token; aktivasi bisa dibayar fotografer atau langsung oleh klien.',
};

export default function Harga() {
  return <HargaPage />;
}
