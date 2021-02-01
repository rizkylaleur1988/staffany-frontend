import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment";
import Layout from "./../../../components/Layout";
import Button from "./../../../components/Button";
import Input, { InputDatePicker } from "./../../../components/Input";

export default function Index(props) {
  const { shift } = props;
  const [payload, setPayload] = useState(shift);
  const router = useRouter();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPayload((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = e.nativeEvent.target;
    const body = {
      ...payload,
      shift_date: moment(payload.shift_date).format("YYYY-MM-DD"),
      start_time: moment(payload.start_time).format("HH:mm"),
      end_time: moment(payload.end_time).format("HH:mm"),
    };
    const res = await fetch(`http://localhost:8080/api/shift/${id.value}`, {
      method: "put",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const shifts = await res.json();
    const status = shifts.status;
    if (status) {
      router.push("/shift");
    }
  };
  return (
    <Layout headerName="Edit Shift">
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={shift._id} />
        <Input type="text" name="name" label="Name" placeholder="Enter your name" onChange={handleChange} value={payload.name} required />
        <InputDatePicker
          label="Shift Date"
          selected={new Date(payload.shift_date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Enter your shift date"
          name="shift_date"
          required
          onChange={(date) => setPayload((prevState) => ({ ...prevState, shift_date: date }))}
        />
        <InputDatePicker
          label="Start Time"
          selected={new Date(payload.start_time)}
          dateFormat="HH:mm"
          placeholderText="Enter your Start Time"
          name="start_time"
          required
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={10}
          onChange={(date) => setPayload((prevState) => ({ ...prevState, start_time: date }))}
        />
        <InputDatePicker
          label="End Time"
          selected={new Date(payload.end_time)}
          dateFormat="HH:mm"
          placeholderText="Enter your End Time"
          name="end_time"
          required
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={10}
          onChange={(date) => setPayload((prevState) => ({ ...prevState, end_time: date }))}
        />
        <Button type="submit">Update</Button>
      </form>
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
  shift.data.shift_date = moment(shift.shift_date).toString();
  shift.data.start_time = moment()
    .set("hours", shift.data.start_time.split(":")[0])
    .set("minutes", shift.data.start_time.split(":")[1])
    .toString();
  shift.data.end_time = moment()
    .set("hours", shift.data.end_time.split(":")[0])
    .set("minutes", shift.data.end_time.split(":")[1])
    .toString();

  return { props: { shift: shift.data }, revalidate: 1 };
}
