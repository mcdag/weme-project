import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CredentialsService } from '../../services/credentialsService copy';
import { useState } from 'react';
import EditCredentialDialog from '../EditCredentialDialog';
import "./styles.scss"

export type CredentialType = {
  id: string;
  createdAt: string;
	type: string;
	title: string;
	email: string | "-";
	url: string | "-";
	number: string | "-";
	name: string | "-";
	cvv: string | "-";
	expirationDate: string | "-";
	password: string | "-";
}
interface IProps {
  rows: CredentialType[]
}

function CredentialsTable({ rows }: IProps) {
  const [editCredentialDialog, setEditCredentialDialog] = useState(false);
  
  const handleOpenEditCredentialDialog = () => {
    setEditCredentialDialog(!editCredentialDialog);
  };

  const handleDeleteCredential = async (id: string) => {
    await CredentialsService.deleteCredential(id);
  }

  const columns: GridColDef[] = [
    { field: 'createdAt', headerAlign: 'center', align: 'center', headerName: 'Dta. Criação', width: 125 },
    { field: 'type',headerAlign: 'center', align: 'center', headerName: 'Tipo', width: 100 },
    { field: 'title',headerAlign: 'center', align: 'center', headerName: 'Título', width: 150 },
    { field: 'email',headerAlign: 'center', align: 'center', headerName: 'Email', width: 150 },
    { field: 'url',headerAlign: 'center', align: 'center', headerName: 'URL', width: 150 },
    { field: 'number',headerAlign: 'center', align: 'center', headerName: 'Nº Cartão', width: 150 },
    { field: 'name',headerAlign: 'center', align: 'center', headerName: 'Nome', width: 150 },
    { field: 'cvv',headerAlign: 'center', align: 'center', headerName: 'CVV', width: 100 },
    { field: 'expirationDate',headerAlign: 'center', align: 'center', headerName: 'Data Exp.', width: 100 },
    { field: 'password',headerAlign: 'center', align: 'center', type: "password", headerName: 'Senha', width: 100 },
    { field: 'actions',headerAlign: 'center', align: 'center', headerName: '', width: 100, renderCell: (params) => {
      return (
        <div>
          {editCredentialDialog && (
            <EditCredentialDialog credential={params.row} open={editCredentialDialog} handleFunction={handleOpenEditCredentialDialog} />
          )}
          <IconButton aria-label="edit" size="medium" onClick={handleOpenEditCredentialDialog}>
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="delete" size="medium" onClick={() =>handleDeleteCredential(params.id.toString())}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      );
    } }
  ];

  return (
    <div className="table-container" style={{ height: 430, width: '100%' }}>
      <DataGrid hideFooter slots={{toolbar: GridToolbar } }sx={{ background:"white" }} rows={rows} columns={columns} />
    </div>
  );
}

export default CredentialsTable;