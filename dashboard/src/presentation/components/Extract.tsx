import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../../store/atoms";
import { getCurrentDate, formatCurrency } from "../../utils";

export default function Extract() {
  const userInfo = useRecoilValue(userInfoAtom);

  const { day, month, week_day, year } = getCurrentDate();

  const formattedDate = `${week_day}, ${day}/${month}/${year}`;

  const [showExtractValue, setShowExtractValue] = useState(false);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-success">{`Olá, ${
          userInfo?.username || "Usuário"
        }!`}</h5>
        <p
          style={{ cursor: "pointer" }}
          className="card-text cursor-pointer d-flex align-items-center"
          onClick={() => setShowExtractValue(!showExtractValue)}
        >
          Saldo da conta corrente
          <i
            className={`ms-2 fa-solid fa-${
              showExtractValue ? "eye-slash" : "eye"
            } fa-md text-success`}
          ></i>
        </p>
        <p className="card-text display-6">
          <strong style={showExtractValue ? {} : { filter: "blur(10px)" }}>
            {formatCurrency(userInfo?.balance || 0)}
          </strong>
        </p>
      </div>
      <div className="card-footer text-capitalize text-muted">
        <small>{formattedDate}</small>
      </div>
    </div>
  );
}
