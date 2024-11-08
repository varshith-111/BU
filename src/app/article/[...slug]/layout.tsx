import Head from 'next/head';

interface LayoutProps {
  title: string;
  description: string;
  imageUrl: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, description, imageUrl, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Default Title'}</title>
        <meta name="description" content={description || 'Default description'} />
        <meta property="og:image" content={imageUrl || '/default-image.jpg'} />
        <meta property="og:title" content={title || 'Default Title'} />
        <meta property="og:description" content={description || 'Default description'} />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;