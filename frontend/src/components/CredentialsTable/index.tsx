import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
  const columns: GridColDef[] = [
    { field: 'createdAt', headerName: 'Dta. Criação', width: 125 },
    { field: 'type', headerName: 'Tipo', width: 100 },
    { field: 'title', headerName: 'Título', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'url', headerName: 'URL', width: 150 },
    { field: 'number', headerName: 'Nº Cartão', width: 150 },
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'cvv', headerName: 'CVV', width: 100 },
    { field: 'expirationDate', headerName: 'Data Exp.', width: 100 },
    { field: 'password', headerName: 'Senha', width: 100 },
    { field: 'actions', headerName: '', width: 100, renderCell: (params) => {
      return (
        <div>
          <IconButton aria-label="edit" size="medium" onClick={()=>console.log("editar")}>
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton aria-label="delete" size="medium" onClick={()=>console.log("deletar")}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      );
    } }
  ];

  return (
    <div className="table-container" style={{ height: 450, width: '100%' }}>
      <DataGrid hideFooter sx={{ background:"white" }} rows={rows} columns={columns} />
    </div>
  );
}

export default CredentialsTable;