import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import moment from "moment";
import Layout from "./../../components/Layout";
import Button from "./../../components/Button";
import Input, { InputDatePicker } from "./../../components/Input";

export default function Index() {
  const router = useRouter();
  const [payload, setPayload] = useState({ name: "", shift_date: "", start_time: "", end_time: "" });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPayload((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      ...payload,
      shift_date: moment(payload.shift_date).format("YYYY-MM-DD"),
      start_time: moment(payload.start_time).format("HH:mm"),
      end_time: moment(payload.end_time).format("HH:mm"),
    };
    const res = await fetch("http://localhost:8080/api/shift", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const shifts = await res.json();
    const status = shifts.status;
    if (status) {
      router.push("/shift");
    } else {
      alert(shifts.message);
    }
  };
  return (
    <Layout headerName="Create Shift">
      <form onSubmit={handleSubmit}>
        <Input type="text" name="name" label="Name" placeholder="Enter your name" onChange={handleChange} value={payload.name} required />
        <InputDatePicker
          label="Shift Date"
          selected={payload.shift_date}
          dateFormat="dd/MM/yyyy"
          placeholderText="Enter your shift date"
          name="shift_date"
          required
          onChange={(date) => setPayload((prevState) => ({ ...prevState, shift_date: date }))}
        />
        <InputDatePicker
          label="Start Time"
          selected={payload.start_time}
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
          selected={payload.end_time}
          dateFormat="HH:mm"
          placeholderText="Enter your Start Time"
          name="end_time"
          required
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={10}
          onChange={(date) => setPayload((prevState) => ({ ...prevState, end_time: date }))}
        />
        <Button type="submit">Save</Button>
      </form>
    </Layout>
  );
}
