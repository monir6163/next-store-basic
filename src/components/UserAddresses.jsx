import { MapPinIcon } from "lucide-react";
import Link from "next/link";

const UserAddresses = ({ addresses }) => {
  return addresses?.map((address, i) => (
    <Link href={`/address/${address._id}`} key={i}>
      <div className="mb-5 gap-4">
        <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
          <div className="mr-3">
            <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2">
              <MapPinIcon size={24} />
            </span>
          </div>
          <figcaption className="text-gray-600">
            <p>
              {address?.address} <br />
              {address?.state}, {address?.city}, {address?.zip},{" "}
              {address?.country}
              <br />
              Phone no: {address?.phone}
            </p>
          </figcaption>
        </figure>
      </div>
    </Link>
  ));
};

export default UserAddresses;
