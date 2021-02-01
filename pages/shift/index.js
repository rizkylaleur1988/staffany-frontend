import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import Layout from "./../../components/Layout";
import Button from "./../../components/Button";
import { Create as CreateIcon, Edit as EditIcon, Trash as TrashIcon, View as ViewIcon } from "./../../components/Icon";

export default function Index(props) {
  const { shifts } = props;
  const router = useRouter();
  const handleCreate = () => router.push("/shift/create");
  const handleDelete = async (_id) => {
    const res = await fetch(`http://localhost:8080/api/shift/${_id}`, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    });
    const shifts = await res.json();
    const status = shifts.status;
    if (status) {
      router.push("/shift");
    }
  };
  return (
    <Layout headerName="Shift">
      <Button onClick={handleCreate}>Create</Button>
      <table className="border-collapse table-auto w-full whitespace-nowrap bg-white relative">
        <thead className="text-white font-semibold">
          <tr className="bg-indigo-400">
            <th>#</th>
            <th>Name</th>
            <th>Shift Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {shifts.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No data Found
              </td>
            </tr>
          )}
          {shifts.map((shift, key) => (
            <tr key={key} className="border-solid border-t border-gray-200 leading-snug">
              <td>{key + 1}</td>
              <td>{shift.name}</td>
              <td>{moment(shift.shift_date).format("DD/MM/YYYY")}</td>
              <td>{shift.start_time}</td>
              <td>{shift.end_time}</td>
              <td className="flex justify-center space-x-2">
                <Link href={{ pathname: "/shift/[id]", query: { id: shift._id } }}>
                  <div className="cursor-pointer">
                    <ViewIcon className="h-5 w-auto text-blue-600" />
                  </div>
                </Link>
                <Link href={{ pathname: "/shift/[id]/edit", query: { id: shift._id } }}>
                  <div className="cursor-pointer">
                    <EditIcon className="h-5 w-auto text-blue-600" />
                  </div>
                </Link>
                <a href="#" onClick={() => handleDelete(shift._id)} className="cursor-pointer">
                  <TrashIcon className="h-5 w-auto text-blue-600" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:8080/api/shift");
  const shifts = await res.json();
  return { props: { shifts: shifts.data }, revalidate: 1 };
}
