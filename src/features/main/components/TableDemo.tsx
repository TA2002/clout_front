import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import { Influencer } from "../types";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface TableDemoProps {
  residents: Influencer[] | null;
}

export const TableDemo: React.FC<TableDemoProps> = ({ residents }) => {
  const navigate = useNavigate();
  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          {/* <TableHead className="">Invoice</TableHead> */}
          <TableHead>Resident</TableHead>
          <TableHead className="w-[150px]">Total reach</TableHead>
          <TableHead className="w-[120px]">
            <FaInstagram />
          </TableHead>
          <TableHead className="w-[120px]">
            <FaTiktok />
          </TableHead>
          <TableHead className="w-[120px]">
            <FaYoutube />
          </TableHead>
          <TableHead className="">Tags</TableHead>
          <TableHead className="">Mediakit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(residents ?? []).map((resident, index) => (
          <TableRow key={index} className="">
            <TableCell className="font-medium">
              <div className="flex flex-row items-center gap-2">
                {resident.mediakit_data.profile_image_url != null ? (
                  <img
                    src={resident.mediakit_data.profile_image_url}
                    className="mask mask-squircle w-10 h-10 rounded-full object-cover"
                    alt="Avatar Tailwind CSS Component"
                  />
                ) : null}
                <div className="flex flex-col">
                  <p>{resident.mediakit_data.display_name}</p>
                  <p className="text-gray-500">
                    @{resident.mediakit_data.cloutname}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="font-bold">247k</p>
            </TableCell>
            <TableCell>
              <p className="text-gray-500 underline cursor-pointer">10k</p>
            </TableCell>
            <TableCell>
              <p className="text-gray-500 underline cursor-pointer">10k</p>
            </TableCell>
            <TableCell>
              <p className="text-gray-500 underline cursor-pointer">10k</p>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-2">
                <Badge>Education</Badge>
                <Badge>Self-improvement</Badge>
                <Badge>Health</Badge>
              </div>
            </TableCell>
            <TableCell>
              <p
                className="text-gray-600 font-medium underline cursor-pointer"
                onClick={() => {
                  navigate(`/${resident.mediakit_data.cloutname}`);
                }}
              >
                View
              </p>
            </TableCell>
            {/* <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};
