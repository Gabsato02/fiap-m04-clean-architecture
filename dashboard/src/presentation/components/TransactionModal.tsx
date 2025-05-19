import React from "react";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useRecoilState } from "recoil";
import { createTransaction, getUser } from "../../infrastructure/repositories";
import { transactionsState, userInfoAtom } from "../../store/atoms";
import { closeModal } from "../../utils";

type TransactionForm = {
  description: string;
  amount: string;
  type: string;
};

export default function TransactionModal() {
  const [loading, setLoading] = React.useState(false);
  const [transactions, setTransactions] = useRecoilState(transactionsState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TransactionForm>({ mode: "onChange" });

  const handleCreateTransaction = async (form: TransactionForm) => {
    setLoading(true);
    try {
      const { description, type, amount } = form;

      const numericAmount = Number(amount.replace(/\D/g, "")) / 100;

      const payload = {
        description,
        type,
        amount: type === "deposit" ? numericAmount : -Math.abs(numericAmount),
      };

      const newTransaction = await createTransaction(payload);

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);

      const newUserInfo = await getUser();
      setUserInfo(newUserInfo);

      reset({
        description: "",
        amount: "",
        type: "",
      });

      closeModal("transactionModal");
    } catch (err) {
      console.error("Erro ao criar transação: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="transactionModal"
      tabIndex={-1}
      aria-labelledby="transactionModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="transactionModalLabel">
              Adicionar Transação
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="mt-3"
              noValidate
              onSubmit={handleSubmit(handleCreateTransaction)}
            >
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Descrição
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.description && "is-invalid"
                  }`}
                  id="description"
                  placeholder="Digite a descrição"
                  {...register("description", {
                    required: "Descrição é obrigatória",
                  })}
                />
                {errors.description && (
                  <div className="invalid-feedback">
                    {errors.description.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Valor
                </label>
                <Controller
                  name="amount"
                  control={control}
                  rules={{ required: "O valor é obrigatório" }}
                  render={({ field }) => (
                    <NumericFormat
                      {...field}
                      className={`form-control ${
                        errors.amount && "is-invalid"
                      }`}
                      id="amount"
                      placeholder="R$ 0,00"
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="R$ "
                      allowNegative={false}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      onValueChange={(values) => {
                        field.onChange(values.value);
                      }}
                    />
                  )}
                />
                {errors.amount && (
                  <div className="invalid-feedback">
                    {errors.amount.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="type" className="form-label">
                  Tipo
                </label>
                <select
                  className={`form-control ${errors.type && "is-invalid"}`}
                  id="type"
                  {...register("type", { required: "O tipo é obrigatório" })}
                >
                  <option value="">Selecione o tipo</option>
                  <option value="deposit">Depósito</option>
                  <option value="transfer">Transferência</option>
                  <option value="withdraw">Saque</option>
                  <option value="payment">Pagamento</option>
                </select>
                {errors.type && (
                  <div className="invalid-feedback">{errors.type.message}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
              >
                {loading ? "Salvando..." : "Salvar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
