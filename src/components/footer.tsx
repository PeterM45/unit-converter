import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 text-center">
      <p className="text-sm text-muted-foreground">
        Created by{' '}
        <Link
          href="https://github.com/PeterM45"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Peter 🖤
        </Link>
        {' • '}
        <Link
          href="https://github.com/PeterM45/unit-converter"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors underline"
        >
          View Source
        </Link>
      </p>
    </footer>
  );
}
