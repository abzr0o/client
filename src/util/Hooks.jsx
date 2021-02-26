import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
	const [data, setdata] = useState(initialState);
	function onchange(e) {
		setdata({ ...data, [e.target.name]: e.target.value });
	}
	const onSubmit = (event) => {
		event.preventDefault();
		callback();
	};
	return { onchange, onSubmit, data };
};
