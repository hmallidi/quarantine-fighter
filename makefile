# run locally
local: main.py
	python main.py
models.html: index.html
	$(PYDOC) -w index
IDB1.log:
	git log > IDB1.log
