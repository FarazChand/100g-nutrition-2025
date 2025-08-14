import { fetchItemDetails } from "@/lib/data";

type PageProps = {
  params: Promise<{ itemId: string }>;
};

export default async function ItemDetailsPage({ params }: PageProps) {
  const { itemId } = await params;

  console.log(`********fcdId: ${itemId}************`);

  const data = await fetchItemDetails(itemId);

  return (
    <div>
      <h1>{data.description}</h1>
    </div>
  );
}
