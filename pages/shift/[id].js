import Head from "next/head";
import moment from "moment";
import Layout from "./../../components/Layout";
import Input from "./../../components/Input";

export default function Index(props) {
  const { shift } = props;
  return (
    <Layout headerName="Detail Shift">
      <Input type="text" name="name" label="Name" value={shift.name} disabled />
      <Input type="text" name="shift_date" label="Shift Date" value={moment(shift.shift_date).format("DD/MM/YYYY")} disabled />
      <Input type="text" name="start_time" label="Start Time" value={shift.start_time} disabled />
      <Input type="text" name="end_time" label="End Time" value={shift.end_time} disabled />
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:8080/api/shift`);
  const shifts = await res.json();
  const paths = shifts.data.map((shift) => ({ params: { id: shift._id } }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:8080/api/shift/${id}`);
  const shift = await res.json();
  return { props: { shift: shift.data }, revalidate: 1 };
}
