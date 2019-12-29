<TextField
              autoFocus
              margin="dense"
              id="amountToMove"
              label="Amount to be added"
              type="number"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{currency}</InputAdornment>
                )
              }}
            />
            {fundSources.map((val, i) => {
              const nameId = `fundOriginName-${i}`;
              const amountId = `fundOriginAmount-${i}`;
              return (
                <div key={val.id}>
                  <FormControl className={classes.fundSourceName}>
                    <InputLabel>Source</InputLabel>
                    <Select labelId={`${nameId}-lavel`} id={nameId}>
                      <MenuItem value="Accounts">Accounts</MenuItem>
                      {budgetNames.map(name => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    id={amountId}
                    label="Amount"
                    type="number"
                    className={classes.fundSourceAmount}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {currency}
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
              );
            })}
            <Button autoFocus onClick={handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Agree
            </Button>