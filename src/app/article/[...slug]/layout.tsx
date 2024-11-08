import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  imageUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description, imageUrl }) => {
  return (
    <>
      <Head>
        <title>Default Title</title>
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