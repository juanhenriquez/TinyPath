import { useSearchParams } from 'next/navigation';

// components
import LinksTableLayout from './LinksTableLayout';
import LinksGroupLayout from './LinksGroupLayout';

export default function Links() {
  const searchParams = useSearchParams();
  const layout = searchParams.get('layout') ?? 'table';

  if (layout === 'table') {
    return <LinksTableLayout />;
  }

  return <LinksGroupLayout />;
}
