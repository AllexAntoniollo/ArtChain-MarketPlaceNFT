export type NewMessage = {
  message: string;
  type: string;
};

export function Message(props: NewMessage) {
  return (
    <div
      style={{ height: "420px", width: "370px" }}
      className="z-20 text-xl text-center fixed top-1/2 left-1/2 p-6 bg-white rounded-3xl -translate-x-1/2 -translate-y-1/2"
    >
      {props.message}
      {props.type === "load" ? (
        <div>Carregando</div>
      ) : props.type === "rejected" ? (
        <div>Rejeitado</div>
      ) : props.type === "successfully" ? (
        <div>Certo</div>
      ) : (
        ""
      )}
    </div>
  );
}
