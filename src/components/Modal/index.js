import PropTypes from 'prop-types';

import ReactPortal from '../ReactPortal';
import Button from '../Button';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

import { Overlay, Container, Footer } from './styles';

export default function Modal({
  danger = false,
  visible,
  isLoading = false,
  title,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
  children,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) return null;

  let container = document.getElementById('modal-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'modal-root');
    document.body.appendChild(container);
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay $isLeaving={!visible} ref={animatedElementRef}>
        <Container $danger={danger} $isLeaving={!visible}>
          <h1>{title}</h1>

          <div className="modal-body">{children}</div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
