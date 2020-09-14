import React from 'react';
import {
  Box,
  Container
} from '@material-ui/core';
import ClienteList from './Cliente';
import PesquisaGrid from './components/PesquisaGrid';
import ClienteModal from './components/Modal/ClienteModal';

const index = () => {

  return (
      <Container maxWidth={false}>
        <Box>
            <h2>
                <strong>
                    Cliente
                </strong>                
            </h2>
        </Box>
        <PesquisaGrid />
        <Box mt={3}>
          <ClienteList />
        </Box>

        <ClienteModal />

      </Container>

  );
};

export default index;