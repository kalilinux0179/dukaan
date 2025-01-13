import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { api } from "@/utils/constant"
import axios from "axios"
import { Binoculars, SquarePen, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import noDataImg from "@/assets/nodata.svg"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import TableSkeleton from "@/components/Common/skeletons/TableSkeleton"

const SellersList = () => {
    const [sellersData, setSellersData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchAllSellers = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${api}/admin/getallsellers`)
                setSellersData(response.data.data);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchAllSellers();
    }, [])
    return (
        <>
            <div className="bg-muted/50 rounded-lg p-4">
                {
                    loading ?
                        (
                            <TableSkeleton />
                        ) :
                        (
                            sellersData.length <= 0 ?
                                (
                                    <AspectRatio ratio={13 / 6} className="flex justify-center items-center" >
                                        <img
                                            src={noDataImg}
                                            alt="No Data"
                                            className="max-h-full max-w-full rounded-md object-cover"
                                        />
                                    </AspectRatio>
                                ) : (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-left">Name</TableHead>
                                                <TableHead className="text-center">Email</TableHead>
                                                <TableHead className="text-center">Verification Status</TableHead>
                                                <TableHead className="text-center">Current Status</TableHead>
                                                <TableHead className="text-right">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {sellersData.map((data) => (
                                                <TableRow key={data.SellerId}>
                                                    <TableCell className="text-left capitalize">{data.Name}</TableCell>
                                                    <TableCell className="text-center">{data.Email}</TableCell>
                                                    <TableCell className="text-center">
                                                        {
                                                            data.Verified ?
                                                                <Badge>Verified</Badge> :
                                                                <Badge variant="destructive">Not Verified</Badge>
                                                        }
                                                    </TableCell>
                                                    <TableCell >
                                                        <div className="flex justify-center items-center gap-4">
                                                            <Select>
                                                                <SelectTrigger className="w-[150px] rounded-lg">
                                                                    <SelectValue placeholder="Status" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="suspended">Suspended</SelectItem>
                                                                        <SelectItem value="banned">Banned</SelectItem>
                                                                        <SelectItem value="warned">Warned</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell >
                                                        <div className="flex justify-end items-center gap-4">
                                                            <Binoculars />
                                                            <SquarePen />
                                                            <Trash2 />
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )
                        )
                }

            </div>
        </>
    )
}

export default SellersList