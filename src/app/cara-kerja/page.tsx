import type { Metadata } from 'next';
import { CaraKerjaPage } from '@/components/CaraKerjaPage';

export const metadata: Metadata = {
  title: 'Cara Kerja',
  description:
    'Buat album, publish dengan satu Token, lalu serahkan kepada klien — tiga langkah dari daftar sampai album tayang.',
};

export default function CaraKerja() {
  return <CaraKerjaPage />;
}
