import axios from "axios";
import { Currencies } from "pages/Payments/Payments.interface";
import { SetCurrencies } from "pages/Payments/PaymentsContext/PaymentsActions";
import { bmsUrl } from "../config/variables";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.delete["Content-Type"] = "application/json";

// interface apiRequest {
//   endpoint: string;
//   token: string | undefined;
// }

const getCurrencies = async (
  token: string,
  dispatch: (arg0: { type: "UPDATE_CURRENCIES"; payload: Currencies[] }) => void
) => {
  const apiConfig = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return await axios
    .get(`${bmsUrl}/currencies?limit=0`, apiConfig)
    .then((response) => {
      const {
        data: {
          data: { currency }
        }
      } = response;
      dispatch(SetCurrencies(currency ?? []));
      return response;
    });
};

const axiosMethods = {
  getCurrencies
};

export default axiosMethods;
