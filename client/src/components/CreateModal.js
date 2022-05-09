import React, { useState } from 'react';
import { Button, Form, Grid, Icon, Image, Label, Modal } from 'semantic-ui-react';
import { FormProvider, useForm, Controller } from 'react-hook-form';

const CreateModal = ({ open, setOpen, isEdit, editData }) => {
  const [loading, setloading] = useState(false);
  const defaultValues = editData ?? {
    name: '',
    targetAmount: '',
    deadlineDate: '0:00',
    description: '',
    address: '',
    image: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    delayError: 500,
    mode: 'onChange',
  });

  const onSubmit = async (formObj) => {
    console.log(formObj);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Modal.Header style={{ display: 'flex', justifyContent: 'center' }}>
        Create a Fundraiser
      </Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Field>
              <label>
                Name<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                placeholder="First Name"
                // value={email}
                type="text"
                // onChange={(e) => setEmail(e.target.value)}
                {...register('name', {
                  required: 'Name is required.',
                })}
              />
              <p style={{ color: '#9d0f0f' }}>{errors.name?.message}</p>
            </Form.Field>

            <Form.Field>
              <label>
                Target Amount<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                placeholder="Target Amount"
                // value={email}
                type="number"
                // onChange={(e) => setEmail(e.target.value)}
                {...register('targetAmount', {
                  required: 'Target is required.',
                })}
              />
              <p style={{ color: '#9d0f0f' }}>{errors.targetAmount?.message}</p>
            </Form.Field>

            <Form.Field>
              <label>
                Deadline date<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                placeholder="Deadline date"
                // value={email}
                type="datetime-local"
                // onChange={(e) => setEmail(e.target.value)}
                {...register('deadlineDate', {
                  required: 'Deadline date is required.',
                })}
              />
              <p style={{ color: '#9d0f0f' }}>{errors.deadlineDate?.message}</p>
            </Form.Field>

            <Form.Field>
              <label>
                Address<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                placeholder="Address"
                // value={email}
                type="text"
                // onChange={(e) => setEmail(e.target.value)}
                {...register('address', {
                  required: 'Address is required.',
                })}
              />
              <p style={{ color: '#9d0f0f' }}>{errors.address?.message}</p>
            </Form.Field>

            <Form.Field>
              <label>
                Image<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                placeholder="Address"
                // value={email}
                type="file"
                // onChange={(e) => setEmail(e.target.value)}
                {...register('address')}
              />
              <p style={{ color: '#9d0f0f' }}>{errors.address?.message}</p>
            </Form.Field>

            <Form.Field>
              <label>
                Description<span style={{ color: 'red' }}>*</span>
              </label>
              <textarea
                placeholder="Description"
                // value={email}
                rows={3}
                // onChange={(e) => setEmail(e.target.value)}
                {...register('description', {
                  required: 'description is required.',
                })}
              />
              <p style={{ color: '#9d0f0f' }}>{errors.description?.message}</p>
            </Form.Field>

            {/* <Form.Field>
              <h3>Images</h3>
              <input type="file" name="image" placeholder="Enter csv file" ref={register({})} />
              <p style={{ color: 'red' }}>{errors.image && 'Images'}</p>
            </Form.Field> */}

            {/* <Button primary type="submit" loading={loading} style={{ display: 'block' }}>
              Submit <Icon name="chevron right" />
            </Button> */}
            <Modal.Actions>
              <Button
                type="submit"
                onClick={() => {
                  // setOpen(false)
                }}
                primary
              >
                Submit <Icon name="chevron right" />
              </Button>
            </Modal.Actions>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateModal;
