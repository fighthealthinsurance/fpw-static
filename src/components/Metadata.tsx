import Head from "next/head";
import React from "react";

interface MetadataProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const Metadata: React.FC<MetadataProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <>
      <Head>
        <title>{`${title} | Fight Paperwork`}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      {children}
    </>
  );
};

export default Metadata;
