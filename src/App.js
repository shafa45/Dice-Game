import {
  Flex,
  Stack,
  Heading,
  Box,
  Text,
  List,
  ListItem,
} from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import { Button } from '@chakra-ui/button'
import { useState } from 'react'

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [diceNumber, setDiceNumber] = useState(1)
  const [error, setError] = useState(false)
  const [score, setScore] = useState(0)
  const numbers = [1, 2, 3, 4, 5, 6]

  const startGameHandler = () => {
    setIsGameStarted(true)
  }

  const onNumberClicked = (val) => {
    setError(false)

    setSelectedNumber(val)
  }

  const generateRandomNumber = () => {
    if (selectedNumber) {
      const generatedNumber = Math.ceil(Math.random() * 6)
      setDiceNumber(generatedNumber)

      if (selectedNumber === generatedNumber) {
        setScore((prev) => prev + generatedNumber)
      } else {
        setScore((prev) => prev - 2)
      }
    } else {
      setError('Please Select Number')
    }
  }

  return (
    <>
      {isGameStarted ? (
        <>
          <Stack
            justify='center'
            align='center'
            maxW='1300px'
            mx='auto'
            h='100vh'
          >
            <Heading
              as='h1'
              color={error ? 'red' : 'black'}
              fontSize='6xl'
              mb='8'
            >
              {error ? error : 'Select Number'}
            </Heading>
            <Flex pb='10'>
              {numbers.map((number) => (
                <Flex
                  key={number}
                  justify='center'
                  align='center'
                  fontSize='2xl'
                  bg={selectedNumber === number ? 'green' : 'black'}
                  color='white'
                  w='50px'
                  h='50px'
                  mr={4}
                  borderRadius='md'
                  onClick={() => onNumberClicked(number)}
                  cursor='pointer'
                >
                  {number}
                </Flex>
              ))}
            </Flex>

            <Box h='150px' w='150px' onClick={generateRandomNumber}>
              <Image src={`/Images/dice/dice${diceNumber}.png`} />
            </Box>

            <Text as='p' fontSize='xl'>
              Click on dice to roll
            </Text>
            <Text
              fontSize='8xl'
              color={score > 0 ? 'green' : 'red'}
              fontWeight='bold'
            >
              {score}
            </Text>
            <Text fontSize='6xl' fontWeight='bold' as='p'>
              Total Score
            </Text>
            <Button onClick={() => setScore(0)}>Reset Score</Button>
          </Stack>

          <Stack maxW='900px' mx='auto'>
            <Heading as='h2'>Game Rules:-</Heading>
            <List>
              <ListItem>Select Number any number</ListItem>
              <ListItem>Click on dice image to roll it</ListItem>
              <ListItem>
                Select number is equal to obtained dice result then you will get
                same point of dice
              </ListItem>
              <ListItem>Click on dice image to roll it</ListItem>
              if You are Wrong Score will be deducted by 2 points
            </List>
          </Stack>
        </>
      ) : (
        <Flex align='center' justify='center'>
          <Image width='50%' src='/Images/dices.png' />
          <Stack>
            <Heading as='h1' fontSize='7xl'>
              The Dice Game
            </Heading>
            <Button
              alignSelf='flex-end'
              bg='black'
              color='white'
              _hover={{ bg: 'grey' }}
              onClick={() => startGameHandler()}
            >
              Start Game
            </Button>
          </Stack>
        </Flex>
      )}
    </>
  )
}

export default App
