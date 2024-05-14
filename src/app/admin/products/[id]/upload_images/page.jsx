import UploadImages from "@/components/admin/UploadImages";

const page = ({ params }) => {
  return <UploadImages id={params.id} />;
};

export default page;
