export default function DeleteButton({
  callback,
  children,
}: {
  callback: () => void;
  children: React.ReactNode;
}) {
  const deleteAccept = () => {
    callback();
    alert("삭제되었습니다");
  };
  return (
    <button
      className="text-red-600"
      onClick={() => {
        confirm("정말로 삭제하시겠습니까?")
          ? confirm("다시는 복구할 수 없습니다.")
            ? deleteAccept()
            : null
          : null;
      }}
    >
      {children}
    </button>
  );
}
