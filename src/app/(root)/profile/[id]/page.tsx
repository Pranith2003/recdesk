import Header from "@/components/header";

const Page = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;

  return (
    <div className="wrapper page">
      <Header
        subHeader="pranithtettabavi@gmail.com"
        title="Pranith | Personal Account"
        userImg="/assets/images/dummy.jpg"
      />
      <h1 className="text-2xl font-karla">User Id: {id}</h1>
    </div>
  );
};

export default Page;
