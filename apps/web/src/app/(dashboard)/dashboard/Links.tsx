// components
import LinksTableLayout from './LinksTableLayout';
import LinksGroupLayout from './LinksGroupLayout';

export default function Links({ layout }: { layout: string }) {
  return layout === 'table' ? <LinksTableLayout /> : <LinksGroupLayout />;
}
