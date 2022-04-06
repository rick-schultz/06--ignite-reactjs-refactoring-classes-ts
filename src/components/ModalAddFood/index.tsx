import { createRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import { FormHandles } from '@unform/core'

import { Form } from './styles'
import Modal from '../Modal'
import Input from '../Input'

interface ModalAddFoodProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit?: (data: object) => void
  handleAddFood: (data: FoodItemProps) => void
}

export interface FoodItemProps {
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

function ModalAddFood(props: ModalAddFoodProps) {
  const inputNameRef = createRef<FormHandles>()

  function handleSubmit(data: FoodItemProps) {
    const { handleAddFood } = props
    handleAddFood(data)
    props.setIsOpen(false)
  }

  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <Form ref={inputNameRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

export default ModalAddFood
