import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@carbon/react';
import Link from 'next/link';

const LogoutModal = ({ onClose }) => {
  const handleLogout = () => {
    onClose();
  };

  return (
    <Modal open={true} onRequestClose={onClose}>
      <ModalHeader className='modal-header' title="Are you sure you want to logout?" />
      <ModalBody>
      <Button kind="secondary" onClick={onClose}>Cancel</Button>
        <Link href="/">
          <Button onClick={handleLogout}>Logout</Button>
        </Link>
      </ModalBody>
    </Modal>
  );
};

export default LogoutModal;
