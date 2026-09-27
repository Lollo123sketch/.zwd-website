import { useEffect } from 'react';
import { siteConfig } from '../config/site';

export function useDocumentMeta(title: string, description = siteConfig.description) {
  useEffect(() => {
    document.title = title === siteConfig.title ? title : `${title} — .zwd`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [description, title]);
}
