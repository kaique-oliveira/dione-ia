import {
  Box,
  Container,
  Flex,
  ScrollArea,
  TextArea,
  RadioCards,
  Text,
  Spinner,
  IconButton,
} from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import ApiLhama from './lib/apiLhama';
import { Code, dracula } from 'react-code-blocks';
import { FaArrowRight } from 'react-icons/fa6';
import { FaRegCopy } from 'react-icons/fa6';
import { useNotification } from '@lumus-ui/react';

type TypeConvertionType =
  | 'interface typescript'
  | 'model do prisma'
  | 'objeto typescript'
  | 'json';
function App() {
  const notification = useNotification();

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

  async function copyCode() {
    if (responseLhama) {
      await navigator.clipboard.writeText(responseLhama);
      notification.showNotification({
        type: 'success',
        timeout: 3000,
        message: 'Código copiado para a área de transferência',
      });
    }
  }

  useEffect(() => {
    if (prompt) {
      handleConvert();
    }
  }, [typeConvertion]);

  return (
    <Container size="4">
      <Flex justify="between" height={'100vh'} gap="32px" p="8px">
        <Flex
          position="relative"
          style={{
            display: 'flex',
            gap: '16px',
            width: '80%',
            flexDirection: 'column',
          }}
        >
          <Flex>
            <RadioCards.Root
              name="type"
              defaultValue={typeConvertion}
              columns={{ initial: '1', sm: '4' }}
            >
              <RadioCards.Item
                style={{ cursor: 'pointer' }}
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
                style={{ cursor: 'pointer' }}
                value="model do prisma"
                onClick={(e) => {
                  setTypeConvertion(
                    e.currentTarget.value as TypeConvertionType
                  );
                }}
              >
                <Flex direction="column" width="100%">
                  <Text weight="bold">Prisma</Text>
                </Flex>
              </RadioCards.Item>
              <RadioCards.Item
                style={{ cursor: 'pointer' }}
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
                style={{ cursor: 'pointer' }}
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
            style={{ height: '100%' }}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <IconButton
            variant="solid"
            style={{
              position: 'absolute',
              top: 72,
              right: 8,
              cursor: 'pointer',
            }}
            radius="full"
            onClick={handleConvert}
          >
            {loading && <Spinner />}
            {!loading && <FaArrowRight />}
          </IconButton>
        </Flex>

        <ScrollArea
          type="always"
          scrollbars="vertical"
          style={{ position: 'relative', width: '100%' }}
        >
          <IconButton
            style={{
              position: 'absolute',
              top: '16px',
              right: '56px',
              cursor: 'pointer',
            }}
            onClick={copyCode}
          >
            <FaRegCopy />
          </IconButton>
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
      </Flex>
    </Container>
  );
}

export default App;
