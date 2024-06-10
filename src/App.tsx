import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  ScrollArea,
  TextArea,
  RadioCards,
  Text,
  Spinner,
} from '@radix-ui/themes';
import { useState } from 'react';
import ApiLhama from './lib/apiLhama';
import { Code, dracula } from 'react-code-blocks';
import { IoMdArrowRoundUp } from 'react-icons/io';

type TypeConvertionType =
  | 'interface typescript'
  | 'model do prisma'
  | 'objeto typescript'
  | 'json';
function App() {
  const [prompt, setPrompt] = useState('');
  const [responseLhama, setResponseLhama] = useState('');
  const [loading, setLoading] = useState(false);
  const [typeConvertion, setTypeConvertion] = useState<TypeConvertionType>(
    'interface typescript'
  );

  async function handleConvert() {
    if (prompt) {
      setLoading(true);
      const response = await ApiLhama.send(
        'transforme: ' + prompt + ' em ' + typeConvertion
      );

      setResponseLhama(response.replace(/`/g, ''));
      setLoading(false);
    }
  }

  return (
    <Container size="4">
      <Flex direction="column" justify="between" height={'100vh'} p="8px">
        <Heading size="4" mb="2" trim="start">
          Dione
        </Heading>
        <ScrollArea type="always" scrollbars="vertical">
          <Box p="2" pr="8">
            <Flex direction="column" gap="4">
              <Code
                text={responseLhama}
                language="typescript"
                showLineNumbers={true}
                wrapLongLines={true}
                theme={dracula}
              />
            </Flex>
          </Box>
        </ScrollArea>

        <Box position="relative" p="8px">
          <Flex p="8px">
            <RadioCards.Root
              name="type"
              defaultValue={typeConvertion}
              columns={{ initial: '1', sm: '4' }}
            >
              <RadioCards.Item
                value="interface typescript"
                onClick={(e) => {
                  setTypeConvertion(
                    e.currentTarget.value as TypeConvertionType
                  );
                }}
              >
                <Flex direction="column" width="100%">
                  <Text weight="bold">Interface</Text>
                </Flex>
              </RadioCards.Item>
              <RadioCards.Item
                value="model do prisma"
                onClick={(e) => {
                  setTypeConvertion(
                    e.currentTarget.value as TypeConvertionType
                  );
                }}
              >
                <Flex direction="column" width="100%">
                  <Text weight="bold">Model Prisma</Text>
                </Flex>
              </RadioCards.Item>
              <RadioCards.Item
                value="objeto"
                onClick={(e) => {
                  setTypeConvertion(
                    e.currentTarget.value as TypeConvertionType
                  );
                }}
              >
                <Flex direction="column" width="100%">
                  <Text weight="bold">Objeto</Text>
                </Flex>
              </RadioCards.Item>
              <RadioCards.Item
                value="json"
                onClick={(e) => {
                  setTypeConvertion(
                    e.currentTarget.value as TypeConvertionType
                  );
                }}
              >
                <Flex direction="column" width="100%">
                  <Text weight="bold">JSON</Text>
                </Flex>
              </RadioCards.Item>
            </RadioCards.Root>
          </Flex>
          <TextArea
            placeholder="O que deseja converter?"
            value={prompt}
            size="3"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
                handleConvert();
              }
            }}
          />
          <Button
            variant="solid"
            size="3"
            style={{
              position: 'absolute',
              bottom: 25,
              right: 24,
              height: '46px',
            }}
            radius="full"
            onClick={handleConvert}
          >
            {loading && <Spinner />}
            {!loading && <IoMdArrowRoundUp />}
          </Button>
        </Box>
      </Flex>
    </Container>
  );
}

export default App;
