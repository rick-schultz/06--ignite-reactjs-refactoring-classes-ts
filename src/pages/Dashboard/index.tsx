import { useState, useEffect } from 'react'

import Header from '../../components/Header'
import api from '../../services/api'
import Food from '../../components/Food'
import ModalAddFood from '../../components/ModalAddFood'
import ModalEditFood from '../../components/ModalEditFood'
import { FoodsContainer } from './styles'

interface FoodItemProps {
  id: number
  name: string
  description: string
  price: number
  available: boolean
  image_url?: string
}

function Dashboard() {
  const [foods, setFoods] = useState<FoodItemProps[]>([])
  const [editingFood, setEditingFood] = useState<FoodItemProps>(
    {} as FoodItemProps
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    async function loadFoods() {
      const response = await api.get('/foods')
      setFoods(response.data)
    }
    loadFoods()
  }, [])

  async function handleAddFood(food: FoodItemProps) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true
      })
      setFoods([...foods, response.data])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleUpdateFood(food: FoodItemProps) {
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food
      })
      const foodsUpdated = foods.map((f) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data
      )
      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`)
    const updatedFoods = foods.filter((food) => food.id !== id)
    setFoods(updatedFoods)
  }

  function toggleModal() {
    setModalOpen(!modalOpen)
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  function handleEditFood(food: FoodItemProps) {
    setEditingFood(food)
    toggleEditModal()
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={(editingFood) => handleUpdateFood(editingFood)}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={() => handleDeleteFood(food.id)}
              handleEditFood={() => handleEditFood(food)}
              available={false}
            />
          ))}
      </FoodsContainer>
    </>
  )
}

export default Dashboard
