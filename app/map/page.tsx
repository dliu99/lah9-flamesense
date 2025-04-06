'use client';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../../components/map'), { ssr: false });

export default function mapPage() {
  return <MapComponent />;
}
