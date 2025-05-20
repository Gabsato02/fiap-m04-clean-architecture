import { UserAuth, AuthReturn } from "../../domain/entities";
import { authRepository } from "../../infrastructure/repositories/authRepository";

export const loginUser = async (payload: UserAuth): Promise<AuthReturn> => {
  try {
    console.log("Iniciando loginUser com payload:", payload); // Log para depuração
    const response = await authRepository.login(payload); // Aguarda a resposta do repositório
    console.log("Resposta do loginUser:", response); // Log da resposta
    return response;
  } catch (error) {
    console.error("Erro no loginUser:", error); // Log de erro
    throw error; // Propaga o erro para o chamador
  }
};

export const createUser = async (payload: UserAuth): Promise<void> => {
  try {
    console.log("Iniciando createUser com payload:", payload); // Log para depuração
    await authRepository.createUser(payload); // Aguarda a criação do usuário
    console.log("Usuário criado com sucesso!"); // Log de sucesso
  } catch (error) {
    console.error("Erro no createUser:", error); // Log de erro
    throw error; // Propaga o erro para o chamador
  }
};