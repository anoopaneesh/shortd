import { Shortd } from "@/types"
import { HStack, Link, Table, Text } from "@chakra-ui/react"
import Loading from "./Loading"
import { IconButton } from "@chakra-ui/react"
import { BiSolidTrashAlt } from "react-icons/bi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { format } from 'date-fns'
import DeleteDialog from "./DeleteDialog";
import { useNavigate } from "react-router";
import { ROUTES } from "@/common/constant";

type MyShortdProps = {
  shortd: Shortd[]
  loading: boolean
  handleDelete: (sid: string) => Promise<void>
}

const MyShortd = ({ shortd, loading, handleDelete }: MyShortdProps) => {
  const navigate = useNavigate()
  const handleAnalytics = (sid:string,longUrl:string) => {
    navigate(ROUTES.Analytics,{state: {sid,longUrl}})
  }
  return (
    <div className="w-full lg:w-xl">
      {loading ? <Loading /> : <Table.Root variant="outline" colorPalette="purple">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Long Url</Table.ColumnHeader>
            <Table.ColumnHeader>Short Url</Table.ColumnHeader>
            <Table.ColumnHeader>Created At</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {shortd.map((short) => (
            <Table.Row key={short._id}>
              <Table.Cell>{short.longUrl}</Table.Cell>
              <Table.Cell><Link href={`${import.meta.env.VITE_SHORTD_SERVICE}/${short.sid}`} target="_blank">{`${import.meta.env.VITE_SHORTD_SERVICE}/${short.sid}`}</Link></Table.Cell>
              <Table.Cell textAlign="end">{format(short.createdAt, "dd-MM-yyyy hh:mm:a")}</Table.Cell>
              <Table.Cell>
                <HStack alignItems="center" gap={4}>
                <IconButton aria-label="delete" variant="ghost" onClick={() => handleAnalytics(short.sid,short.longUrl)}>
                      <IoAnalyticsSharp color="white" />
                    </IconButton>
                  <DeleteDialog
                    onPrimaryClick={() => handleDelete(short.sid)}
                    title="Are you sure ?"
                    body="This action cannot be undone. This will remove the short url"
                    primaryActionText="Delete"
                    secondaryActionText="Cancel"
                  >
                    <IconButton aria-label="delete" variant="ghost">
                      <BiSolidTrashAlt color="red" />
                    </IconButton>
                  </DeleteDialog>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
          {shortd.length === 0 ? <Table.Row>
            <Table.Cell colSpan={4}>
              <Text textAlign="center">No urls shortened yet.</Text>
            </Table.Cell>
          </Table.Row> : <></>}
        </Table.Body>
      </Table.Root>}
    </div>
  )
}
export default MyShortd
