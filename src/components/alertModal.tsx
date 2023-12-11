import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'

interface ModalComponentProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void // ページ内で削除処理を定義する関数
}

const AlertModal: React.FC<ModalComponentProps> = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} className="rounded-lg bg-white p-8">
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
          <ModalBody>
            <p>削除しますがよろしいですか？</p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onPress={onClose}
              className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
            >
              キャンセル
            </Button>
            <Button
              onClick={onDelete}
              className="rounded bg-customPink px-4 py-2 text-white hover:bg-customPink"
            >
              削除
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}

export default AlertModal
