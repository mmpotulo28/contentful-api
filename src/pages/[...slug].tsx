// pages/[...slug].tsx
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "../lib/contentful";
import Image from "next/image";

interface PageProps {
  page: {
    fields: {
      title: string;
      url: string;
      topNavImage: { fields: { file: { url: string } } };
    };
    contentTypeId: string;
  };
}

const Page = ({ page }: PageProps) => {
  if (!page) return <div>Page not found</div>;

  return (
    <div>
      <h1>{page.fields.title}</h1>
      <Image
        src={`https:${page.fields.topNavImage.fields.file.url}`}
        alt={page.fields.title}
        width={500} // replace with actual width
        height={300} // replace with actual height
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "CorePage" });
  const paths = res.items.map((item) => ({
    params: {
      slug: item.fields.url?.toString()?.split("/").filter(Boolean),
    },
  }));

  console.log(
    "paths: ",
    paths.map((path) => path.params.slug?.join("/"))
  );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string[] };
  const res = await client.getEntries({
    content_type: "CorePage",
    "fields.url": `/${slug.join("/")}`,
  });

  console.log("res: ", res.items[0].fields);

  if (!res.items.length) {
    return { notFound: true };
  }

  return {
    props: {
      page: res.items[0],
    },
    revalidate: 1,
  };
};

export default Page;
