import { createRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import { FormHandles } from '@unform/core'

import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

interface Food {
  id: number
  name: string
  description: string
  price: number
  available: boolean
  image: string
  category: number
  createdAt: Date
  updatedAt: Date
}

interface ModalEditFoodProps {
  editingFood: Food
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit?: (data: object) => void
  handleUpdateFood: (data: object) => void
}

function ModalEditFood(props: ModalEditFoodProps) {
  const inputNameRef = createRef<FormHandles>()

  function handleSubmit(data: object) {
    const { handleUpdateFood } = props
    handleUpdateFood(data)
    props.setIsOpen(false)
  }

  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <Form
        ref={inputNameRef}
        onSubmit={handleSubmit}
        initialData={props.editingFood}
      >
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalEditFood
